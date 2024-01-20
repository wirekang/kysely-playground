import { JSDELIVR_API_LIST_TAGS, JSDELIVR_API_SERVER } from "../constants";
import { HttpUtils } from "../utility/http-utils";
import { StringUtils } from "../utility/string-utils";

export class JsDelivrUtils {
  static npmPrefix(name: string) {
    return `https://cdn.jsdelivr.net/npm/${name}`;
  }

  static githubPrefix(owner: string, repo: string) {
    return `https://cdn.jsdelivr.net/gh/${owner}/${repo}`;
  }

  private static make(prefix: string, version: string, file: string) {
    return prefix + "@" + version + "/" + StringUtils.trimPrefix(file, "/");
  }

  static npm(name: string, version: string, file: string) {
    return JsDelivrUtils.make(JsDelivrUtils.npmPrefix(name), version, file);
  }

  static github(owner: string, repo: string, version: string, file: string) {
    return JsDelivrUtils.make(JsDelivrUtils.githubPrefix(owner, repo), version, file);
  }

  static async listNpmVersions(name: string): Promise<Array<string>> {
    const body = await HttpUtils.getJson(JSDELIVR_API_LIST_TAGS + name);
    return body.versions.map((it: any) => it.version);
  }
}
