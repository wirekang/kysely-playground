async function getRemoteDtsPaths() {
  const arr = (await fetchText("/copytype/files.txt")).split("\n");
  arr.pop();
  return arr;
}

export async function getCopytypeTypes() {
  const paths = await getRemoteDtsPaths();
  return Promise.all(
    paths.map(async (path) => {
      const fileName = path.replace("./", "");
      const filePath = `file:///node_modules/@types/${fileName}`;
      const content = await fetchText(`copytype/${path}`);
      return { filePath, content };
    })
  );
}

async function fetchText(url: string) {
  const r = await fetch("/kysely-playground/" + url);
  return r.text();
}
