import { JSDELIVR_API_LIST_TAGS, JSDELIVR_ESM } from "../constants";
import { HttpUtils } from "../utility/http-utils";
import { StringUtils } from "../utility/string-utils";

export class JsDelivrUtils {
  static npmPrefix(name: string) {
    return `https://cdn.jsdelivr.net/npm/${name}`;
  }

  static githubPrefix(owner: string, repo: string) {
    return `https://cdn.jsdelivr.net/gh/${owner}/${repo}`;
  }

  static npm(name: string, version: string, file: string) {
    return make(JsDelivrUtils.npmPrefix(name), version, file);
  }

  static github(owner: string, repo: string, version: string, file: string) {
    return make(JsDelivrUtils.githubPrefix(owner, repo), version, file);
  }

  static async listNpmVersions(name: string): Promise<Array<string>> {
    const body = await HttpUtils.getJson(JSDELIVR_API_LIST_TAGS + name);
    return body.versions
      .map((it: any) => it.version)
      .filter((it: string) => !isOldVersion(it))
      .filter(
        (it: string, i: number) =>
          i < 3 || (!it.includes("-dev.") && !it.includes("-insiders.") && !it.includes("-beta")),
      );
  }

  static esm(name: string, version: string, file: string) {
    return JSDELIVR_ESM + `/${name}@${version}/${StringUtils.trimPrefix(file, "/")}`;
  }
}

function isOldVersion(v: string): boolean {
  try {
    return parseInt(v.split(".")[0]) < 4;
  } catch {
    return false;
  }
}

function make(prefix: string, version: string, file: string) {
  return prefix + "@" + version + "/" + StringUtils.trimPrefix(file, "/");
}
