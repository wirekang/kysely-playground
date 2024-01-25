export type State = {
  dialect: "postgres" | "mysql" | "mssql" | "sqlite";
  editors: {
    type: string;
    query: string;
  };
  views?: {
    type?: boolean;
    query?: boolean;
    result?: boolean;
  };
  kysely?: {
    type: "tag" | "branch";
    name: string;
  };
};
