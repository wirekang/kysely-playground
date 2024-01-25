import { HttpUtils } from "../utility/http-utils";
import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";
import { GITHUB_MINIFIED_KYSELY_OWNER, GITHUB_MINIFIED_KYSELY_REPO } from "../constants";
import { StringUtils } from "../utility/string-utils";

export type File = {
  path: string;
  data: ArrayBuffer;
};

export class KyselyModule {
  readonly id: string;
  private readonly baseUrl: string;

  constructor(
    readonly type: "tag" | "branch",
    readonly name: string,
    private readonly commitId: string,
    private readonly minifiedCommitId: string,
    private readonly dir: string,
    private readonly files: ReadonlyArray<string>,
    readonly exports: ReadonlyArray<string>,
    readonly dependencies: Readonly<Record<string, string>>,
    readonly dialects: Readonly<Array<string>>,
  ) {
    if (type === "branch") {
      this.id = `${name}(${commitId.substring(0, 4)})`;
    } else {
      this.id = `${name}`;
    }
    this.baseUrl = JsDelivrUtils.github(
      GITHUB_MINIFIED_KYSELY_OWNER,
      GITHUB_MINIFIED_KYSELY_REPO,
      this.minifiedCommitId,
      dir,
    );
  }

  loadFiles(): Promise<Array<File>> {
    return Promise.all(
      this.files.map(async (file) => {
        const url = this.baseUrl + "/" + StringUtils.trimPrefix(file, "/");
        const data = await HttpUtils.getBytes(url);
        return {
          path: file,
          data,
        };
      }),
    );
  }
}
