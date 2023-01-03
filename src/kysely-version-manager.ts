import KYSELY_VERSIONS from "./gen/kysely-versions.json";

export class KyselyVersionManager {
  public static LATEST = KYSELY_VERSIONS[0];
  public static VERSIONS = KYSELY_VERSIONS;

  public onChangeTypeContent?: (v: string) => void;

  public async setVersion(v: string) {
    if (!KYSELY_VERSIONS.includes(v)) {
      throw new Error(`Wrong version ${v}`);
    }
    const noDotName = v.replace(/\./g, "_");

    const m = await import(`./gen/types/kysely_${noDotName}.d.ts?raw`);
    const rawTypeContent = m.default;
    this.onChangeTypeContent && this.onChangeTypeContent(rawTypeContent);
  }

  public static toModuleString(v: string) {
    const noDotName = v.replace(/\./g, "_");
    return `kysely_${noDotName}`;
  }
}
