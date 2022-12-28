import { SQLDialect } from "../typings/dialect";

let didLoad = false;

export function load() {
  didLoad = true;
  if (window.location.hash?.length > 1) {
    const d = JSON.parse(atob(window.location.hash.substring(1)));
    console.log(d);
    if (!d.dialect || !d.ts) {
      return undefined;
    }
    return {
      dialect: d.dialect,
      ts: d.ts,
    };
  }
  return undefined;
}

export function onChangeState(dialect: SQLDialect, ts: string) {
  if (!didLoad) {
    return;
  }
  const hash = btoa(JSON.stringify({ dialect, ts }));
  window.history.replaceState(null, document.title, `#${hash}`);
}
