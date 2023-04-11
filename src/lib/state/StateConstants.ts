import type { ShareableState } from "src/lib/state/types/ShareableState"
import { SqlDialect } from "src/lib/sql/types/SqlDialect"

export class StateConstants {
  public static readonly DEFAULT_SHAREABLE_STATE: ShareableState = {
    dialect: SqlDialect.Postgres,
    kyselyVersion: "0.24.0",
    ts:
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
  }
}
