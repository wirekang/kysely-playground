package generator

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestYarnInfoVersions(t *testing.T) {
	rst, err := yarnInfoVersions("typescript")
	if err != nil {
		panic(err)
	}
	assert.Equal(t, "0.8.0", rst[len(rst)-1])
	assert.Equal(t, "0.8.1", rst[len(rst)-2])
}

func TestGenerateModules(t *testing.T) {
	rst, err := generateModulesTs([]Module{
		{
			Name: "foo",
			Versions: []Version{
				{
					Name:  "0.0.1",
					Alias: "foo_0_0_1",
				},
				{
					Name:  "0.0.2",
					Alias: "foo_0_0_2",
				},
			},
		},
		{
			Name: "bar",
			Versions: []Version{
				{
					Name:  "5.0.0",
					Alias: "bar_5_0_0",
				},
			},
		},
	})
	if err != nil {
		panic(err)
	}
	assert.Equal(t, `export const MODULES = {
  "foo": {
    "0.0.1": {
      "module": () => import("foo_0_0_1"),
      "type": () => import("./types/foo_0_0_1.d.ts?raw"),
    },
    "0.0.2": {
      "module": () => import("foo_0_0_2"),
      "type": () => import("./types/foo_0_0_2.d.ts?raw"),
    },
  },
  "bar": {
    "5.0.0": {
      "module": () => import("bar_5_0_0"),
      "type": () => import("./types/bar_5_0_0.d.ts?raw"),
    },
  },
} as const
`, string(rst))
}

func TestReverse(t *testing.T) {
	ff := []string{"3", "2", "1"}
	reverse(ff)
	assert.Equal(t, "1", ff[0])
	assert.Equal(t, "2", ff[1])
	assert.Equal(t, "3", ff[2])
}
