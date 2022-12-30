import { SQLDialect } from "../typings/dialect";

export type State = {
  dialect: SQLDialect;
  ts: string;
};

const defaultState: State = {
  dialect: "mysql",
  ts: `
interface DB {
  user: UserTable
}

interface UserTable {
  id: Generated<string>
  name: string | null
  created_at: Generated<Date>
}

result = kysely
  .selectFrom("user")
  .selectAll()
  .where("name", "=", "foo")
  .orderBy("created_at", "desc")
  `.trim(),
};

export async function load(): Promise<State | undefined> {
  if (window.location.search.length > 1) {
    return loadFromStore();
  }
  if (window.location.hash?.length > 1) {
    console.log("parse legacy hash");
    const d = JSON.parse(atob(window.location.hash.substring(1)));
    if (!d.dialect || !d.ts) {
      return undefined;
    }
    return {
      dialect: d.dialect,
      ts: d.ts,
    };
  }
  return defaultState;
}

async function loadFromStore() {
  const params = new URLSearchParams(window.location.search);
  const i = params.get("i");
  if (!i) {
    throw new Error("no i");
  }
  const res = await idToState(i);
  return {
    dialect: res.dialect,
    ts: res.ts,
  };
}

export async function makeShareUrl(state: State) {
  const id = await stateToId(state);
  return `${makeFullUrl()}?i=${id}`;
}

async function stateToId(state: State) {
  const r = await fetch("https://kysely-playground-default-rtdb.firebaseio.com/state.json", {
    method: "POST",
    body: JSON.stringify({
      ...state,
      created_at: {
        ".sv": "timestamp",
      },
    }),
  });
  const res = await r.json();
  if (r.status !== 200) {
    throw new Error(res.error || JSON.stringify(res, null, 2));
  }
  return res.name;
}

async function idToState(id: string) {
  const r = await fetch(`https://kysely-playground-default-rtdb.firebaseio.com/state/${id}.json`);
  const res = await r.json();
  if (res === null) {
    throw new Error("wrong id");
  }
  if (!res.dialect || typeof res.ts !== "string") {
    console.error(res);
    throw new Error("wrong result");
  }
  return {
    dialect: res.dialect,
    ts: res.ts,
  };
}

function makeFullUrl() {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
}
