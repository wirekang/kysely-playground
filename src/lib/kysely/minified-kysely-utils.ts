import { StringUtils } from "../utility/string-utils";
import { MINIFIED_KYSELY_CDN } from "./constants";

export class MinifiedKyselyUtils {
  static getFileUrl(commitId: string, file: string) {
    return MINIFIED_KYSELY_CDN + "@" + commitId + "/" + StringUtils.trimPrefix(file, "/");
  }
}
