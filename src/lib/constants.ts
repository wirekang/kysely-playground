import type { State } from "./state/state";

export const JSDELIVR_API_SERVER = "https://data.jsdelivr.com";
export const JSDELIVR_API_LIST_TAGS = `${JSDELIVR_API_SERVER}/v1/packages/npm/`;
export const JSDELIVR_ESM = "https://esm.run";

export const GITHUB_MINIFIED_KYSELY_OWNER = "wirekang";
export const GITHUB_MINIFIED_KYSELY_REPO = "minified-kysely";
export const GITHUB_MINIFIED_KYSELY_MAIN_BRANCH = "main";

export const GITHUB_API_MINIFIED_KYSELY_MAIN_REFS = `https://api.github.com/repos/${GITHUB_MINIFIED_KYSELY_OWNER}/${GITHUB_MINIFIED_KYSELY_REPO}/git/refs/heads/${GITHUB_MINIFIED_KYSELY_MAIN_BRANCH}`;

export const FIRESTORE_PROJECT_ID = "kysely-playground";
export const FIRESTORE_COLLECTION_FRAGMENTS = "states";

export const CSS_MIN_WIDE_WIDTH = 650;

export const LOCALSTORAGE_THEME = "theme";

export const LEGACY_PLAYGROUND_URL = "https://old.kyse.link";

export const DEFUALT_STATE: State = {
  dialect: "postgres",
  editors: {
    query: ``,
    type: ``,
  },
};
