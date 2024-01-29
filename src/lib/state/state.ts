export type State = {
  dialect: "postgres" | "mysql" | "mssql" | "sqlite";
  editors: {
    type: string;
    query: string;
  };
  hideType?: boolean;
  kysely?: {
    type: "tag" | "branch";
    name: string;
  };
};
