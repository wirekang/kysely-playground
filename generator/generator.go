package generator

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/wirekang/kysely-playground/generator/cmdutils"
	"io/fs"
	"os"
	"strings"
	"text/template"
)

type NpmModule = string

type Module struct {
	Name     string
	Versions []Version
}

type Version struct {
	Name  string
	Alias string
}

type YarnInfo struct {
	Type string   `json:"type"`
	Data []string `json:"data"`
}

const rootDir = "src/generated/"
const typesDir = rootDir + "types/"
const modulesTsPath = rootDir + "modules.ts"
const modulesTsTemplate = `export const MODULES = {
{{- range . }}
  "{{ .Name }}": {
  {{- range .Versions }}
    "{{ .Name }}": {
      "module": () => import("{{ .Alias }}"),
      "type": () => import("./types/{{ .Alias }}.d.ts?raw"),
    },
  {{- end }}
  },
{{- end }}
} as const
`
const mysqlHelpersVersion = "0.24.1"
const postgresHelpersVersion = "0.24.0"

func yarnInfoVersions(npmModule NpmModule) ([]string, error) {
	data, err := cmdutils.ExecuteBytes("yarn", "info", npmModule, "versions", "--json")
	if err != nil {
		return nil, err
	}
	var y YarnInfo
	err = json.Unmarshal(data, &y)
	if err != nil {
		return nil, err
	}
	reverse(y.Data)
	return y.Data, nil
}

func generateModulesTs(modules []Module) ([]byte, error) {
	t, err := template.New("modules").Parse(modulesTsTemplate)
	if err != nil {
		return nil, err
	}
	buf := bytes.NewBuffer(nil)
	err = t.Execute(buf, modules)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func generateModule(npmModule NpmModule, maxSize int) (Module, error) {
	versionNames, err := yarnInfoVersions(npmModule)
	if err != nil {
		return Module{}, err
	}
	if len(versionNames) > maxSize {
		versionNames = versionNames[:maxSize]
	}
	versions := make([]Version, len(versionNames))
	for i, versionName := range versionNames {
		versions[i] = Version{
			Name:  versionName,
			Alias: makeAlias(npmModule, versionName),
		}
	}
	return Module{
		Name:     npmModule,
		Versions: versions,
	}, nil
}

func generateKyselyHelpersModule(dialect string, minVersion string, kyselyModule Module) Module {
	versions := make([]Version, 0, len(kyselyModule.Versions))
	for _, version := range kyselyModule.Versions {
		versions = append(versions, Version{
			Name:  version.Name,
			Alias: version.Alias + "/helpers/" + dialect,
		})
		if version.Name == minVersion {
			break
		}
	}
	return Module{
		Name:     "kysely/helpers/" + dialect,
		Versions: versions,
	}
}

func generateKyselyModules() ([]Module, error) {
	kyselyModule, err := generateModule("kysely", 20)
	if err != nil {
		return nil, err
	}
	mysqlHelpers := generateKyselyHelpersModule("mysql", mysqlHelpersVersion, kyselyModule)
	postgresHelpers := generateKyselyHelpersModule("postgres", postgresHelpersVersion, kyselyModule)
	return []Module{
		kyselyModule, mysqlHelpers, postgresHelpers,
	}, nil
}

func clearDirs() error {
	err := os.RemoveAll(rootDir)
	if err != nil {
		return err
	}
	err = os.MkdirAll(rootDir, fs.ModePerm)
	if err != nil {
		return err
	}
	return os.MkdirAll(typesDir, fs.ModePerm)
}

func yarnInstallModule(module Module) error {
	args := []string{"add"}
	for _, version := range module.Versions {
		args = append(args, fmt.Sprintf(`%s@npm:%s@%s`, version.Alias, module.Name, version.Name))
	}
	return cmdutils.Execute("yarn", args...)
}

func generateKyselyTypeFile(module Module, root string) error {
	for _, version := range module.Versions {
		tempDir, err := os.MkdirTemp("", "kysely")
		if err != nil {
			return err
		}
		srcDir := "./node_modules/" + version.Alias + "/dist/esm"
		err = cmdutils.Execute("cp", "-r", srcDir, tempDir)
		if err != nil {
			return err
		}
		in := tempDir + "/esm/index.d.ts"
		out := root + "/" + version.Alias + ".d.ts"
		err = npxRollupDts(in, out)
		if err != nil {
			return err
		}
		_ = os.RemoveAll(tempDir)
	}
	return nil
}

func npxRollupDts(in string, out string) error {
	return cmdutils.Execute("npx", "rollup", "--plugin", "rollup-plugin-dts", "--format=es", "--file="+out, in)
}

func makeAlias(npmModule NpmModule, version string) string {
	return strings.ReplaceAll(npmModule, "/", "_") + "_" + version
}

func reverse[S ~[]E, E any](s S) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}

func Start() error {
	err := clearDirs()
	if err != nil {
		return err
	}
	kyselyModules, err := generateKyselyModules()
	if err != nil {
		return err
	}
	err = yarnInstallModule(kyselyModules[0])
	if err != nil {
		return err
	}
	err = generateKyselyTypeFile(kyselyModules[0], typesDir)
	if err != nil {
		return err
	}
	data, err := generateModulesTs(kyselyModules)
	if err != nil {
		return err
	}

	err = os.WriteFile(modulesTsPath, data, os.ModePerm)
	if err != nil {
		return err
	}
	return nil
}
