export type SqlFormatOptions = {
  keywordCase: "preserve" | "upper" | "lower";
  injectParameters: boolean;
};

export type TypescriptFormatOptions = {
  semi: boolean;
  printWidth: number;
  singleQuote: boolean;
};
