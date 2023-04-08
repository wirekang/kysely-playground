import { editor, Uri } from "monaco-editor"

export class EditorConstants {
  public static readonly TYPESCRIPT_FILE_PATH = "file:///typescript.ts"
  public static readonly SQL_FILE_PATH = "file:///sql.sql"
  public static readonly KYSELY_TYPE_PATH = "file:///node_modules/kysely/index.d.ts"
  public static readonly GLOBAL_TYPE_PATH = "file:///global.d.ts"

  private static readonly COMMON_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    theme: "vs-dark",
    quickSuggestions: {
      strings: false,
      comments: false,
      other: true,
    },
    quickSuggestionsDelay: 10,
    lineNumbers: "off",
    folding: false,
    automaticLayout: true,
    fontFamily: "Jetbrains Mono",
    padding: { top: 2, bottom: 4 },
  }

  public static readonly TYPESCRIPT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "typescript",
    model: editor.createModel(
      "import { GeneratedAlways } from 'kysely'\n" +
        "\n" +
        "declare global {\n" +
        "  interface DB {\n" +
        "    job_listings: JobListing\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "interface JobListing {\n" +
        "  company_id: string\n" +
        "  title: string\n" +
        "  description: string\n" +
        "  job_id: GeneratedAlways<number>\n" +
        "}\n" +
        "\n" +
        "result = kysely\n" +
        "  .with('jobs_grouped', (eb) =>\n" +
        "    eb\n" +
        "      .selectFrom('job_listings')\n" +
        "      .groupBy(['company_id', 'title', 'description'])\n" +
        "      .select((eb) => [\n" +
        "        'company_id',\n" +
        "        'title',\n" +
        "        'description',\n" +
        "        eb.fn.count('job_id').as('job_count'),\n" +
        "      ]),\n" +
        "  )\n" +
        "  .selectFrom('jobs_grouped')\n" +
        "  .where('job_count', '>', 1)\n" +
        "  .select((eb) =>\n" +
        "    eb.fn.count('company_id').distinct().as('co_w_duplicate_jobs'),\n" +
        "  )\n",
      "typescript",
      Uri.parse(EditorConstants.TYPESCRIPT_FILE_PATH)
    ),
  }

  public static readonly SQL_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
    ...EditorConstants.COMMON_EDITOR_OPTIONS,
    language: "sql",
    model: editor.createModel(
      "WITH\n" +
        "  `jobs_grouped` AS (\n" +
        "    SELECT\n" +
        "      `company_id`,\n" +
        "      `title`,\n" +
        "      `description`,\n" +
        "      COUNT(`job_id`) AS `job_count`\n" +
        "    FROM\n" +
        "      `job_listings`\n" +
        "    GROUP BY\n" +
        "      `company_id`,\n" +
        "      `title`,\n" +
        "      `description`\n" +
        "  )\n" +
        "SELECT\n" +
        "  COUNT(DISTINCT `company_id`) AS `co_w_duplicate_jobs`\n" +
        "FROM\n" +
        "  `jobs_grouped`\n" +
        "WHERE\n" +
        "  `job_count` > ?WITH\n" +
        "  `jobs_grouped` AS (\n" +
        "    SELECT\n" +
        "      `company_id`,\n" +
        "      `title`,\n" +
        "      `description`,\n" +
        "      COUNT(`job_id`) AS `job_count`\n" +
        "    FROM\n" +
        "      `job_listings`\n" +
        "    GROUP BY\n" +
        "      `company_id`,\n" +
        "      `title`,\n" +
        "      `description`\n" +
        "  )\n" +
        "SELECT\n" +
        "  COUNT(DISTINCT `company_id`) AS `co_w_duplicate_jobs`\n" +
        "FROM\n" +
        "  `jobs_grouped`\n" +
        "WHERE\n" +
        "  `job_count` > ?",
      "sql",
      Uri.parse(EditorConstants.SQL_FILE_PATH)
    ),
    guides: { indentation: false },
  }
}
