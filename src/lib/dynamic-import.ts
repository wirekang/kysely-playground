export function dynamicImport(url: string) {
  return import(
    /* @vite-ignore */
    url
  );
}
