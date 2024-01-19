import axios from "axios";
import { MINIFIED_KYSELY_CDN } from "./constants";
import { HttpUtils } from "../utility/http-utils";

export type File = {
  path: string;
  data: ArrayBuffer;
};

export class KyselyModule {
  readonly label: string;
  private readonly urlPrefix: string;

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
    this.urlPrefix = MINIFIED_KYSELY_CDN + "@" + this.minifiedCommitId + "/" + dir + "/";
  }

  loadFiles(): Promise<Array<File>> {
    return Promise.all(
      this.files.map(async (file) => {
        const url = this.urlPrefix + file;
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
