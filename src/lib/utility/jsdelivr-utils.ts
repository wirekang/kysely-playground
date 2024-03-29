import { JSDELIVR_API_LIST_TAGS, JSDELIVR_ESM } from "../constants";
import { HttpUtils } from "./http-utils";
import { StringUtils } from "./string-utils";

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
    return body.versions.map((it: any) => it.version);
  }

  static esm(name: string, version: string, file: string) {
    return JSDELIVR_ESM + `/${name}@${version}/${StringUtils.trimPrefix(file, "/")}`;
  }
}

function make(prefix: string, version: string, file: string) {
  return prefix + "@" + version + "/" + StringUtils.trimPrefix(file, "/");
}
