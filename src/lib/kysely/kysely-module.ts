import { HttpUtils } from "../utility/http-utils";
import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";
import { GITHUB_MINIFIED_KYSELY_OWNER, GITHUB_MINIFIED_KYSELY_REPO } from "../constants";
import { StringUtils } from "../utility/string-utils";

export type File = {
  path: string;
  data: ArrayBuffer;
};

export class KyselyModule {
  readonly label: string;
  private readonly baseUrl: string;

  constructor(
    private readonly type: string,
    private readonly id: string,
    private readonly commitId: string,
    private readonly minifiedCommitId: string,
    private readonly dir: string,
    private readonly files: ReadonlyArray<string>,
    readonly exports: ReadonlyArray<string>,
    readonly dependencies: Readonly<Record<string, string>>,
  ) {
    if (type === "branch") {
      this.label = `${id}(${commitId.substring(0, 8)})`;
    } else {
      this.label = `${id}`;
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

  toString(): string {
    return this.label;
  }
}
