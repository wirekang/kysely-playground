import { HttpUtils } from "../utility/http-utils";
import {
  GITHUB_API_MINIFIED_KYSELY_MAIN_REFS,
  GITHUB_MINIFIED_KYSELY_OWNER,
  GITHUB_MINIFIED_KYSELY_REPO,
} from "../constants";
import { KyselyModule } from "./kysely-module";
import { JsDelivrUtils } from "../jsdelivr/jsdelivr-utils";

export class KyselyManager {
  static async init(): Promise<KyselyManager> {
    const minifiedCommitId = await getLatestMinifiedCommitId();
    const infoJson = await getInfoJson(minifiedCommitId);
    const lastCommitId = infoJson.lastCommitId;
    const modules: Array<KyselyModule> = [];

    infoJson.tags.forEach((tag: any) => {
      modules.unshift(
        new KyselyModule(
          "tag",
          tag.id,
          tag.commitId,
          minifiedCommitId,
          tag.dir,
          tag.files,
          tag.exports,
          tag.dependencies,
        ),
      );
    });
    infoJson.branches.forEach((branch: any) => {
      modules.unshift(
        new KyselyModule(
          "branch",
          branch.id,
          branch.commitId,
          minifiedCommitId,
          branch.dir,
          branch.files,
          branch.exports,
          branch.dependencies,
        ),
      );
    });

    return new KyselyManager(minifiedCommitId, lastCommitId, modules);
  }

  private constructor(
    private readonly minifiedCommitId: string,
    readonly lastCommitId: string,
    readonly modules: ReadonlyArray<KyselyModule>,
  ) {}
}

async function getLatestMinifiedCommitId() {
  return (await HttpUtils.getJson(GITHUB_API_MINIFIED_KYSELY_MAIN_REFS)).object.sha as string;
}

function getInfoJson(commitId: string) {
  return HttpUtils.getJson(
    JsDelivrUtils.github(
      GITHUB_MINIFIED_KYSELY_OWNER,
      GITHUB_MINIFIED_KYSELY_REPO,
      commitId,
      "dist/info.json",
    ),
  );
}
