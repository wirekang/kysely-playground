import { EditorController } from "./editor-controller";

export class ResultController {
  constructor(private readonly root: HTMLDivElement) {
    this.clear();
    (async () => {
      await this.appendMessage("warn", "This is warning message. Something is happened but it's not fatal.");
      await this.appendMessage("error", "This is error message. A key feature is not working.");
      await this.appendEditor("text", `${new Error("this is the message of catched error").stack}`);
      await this.appendPadding();
      await this.appendPadding();
      await this.appendPadding();
      await this.appendPadding();
      await this.appendMessage("info", "execute() has been called multiple times.");
      await this.appendPadding();
      await this.appendMessage("info", "#1");
      await this.appendEditor(
        "sql",
        `SELECT
  "posts"."id" AS "_id",
  "posts"."url" AS "url",
  "posts"."post_key" AS "id",
  (
    SELECT
      COALESCE(json_agg (agg), '[]')
    FROM
      (
        SELECT
          "id"
        FROM
          "posts_subposts"
          INNER JOIN "posts" AS "subposts" ON "posts_subposts"."subpost_id" = "posts"."id"
        WHERE
          "posts_subposts"."post_id" = "posts"."id"
      ) AS agg
  ) AS "childPosts"
FROM
  "posts"`,
      );
      await this.appendPadding();
      await this.appendMessage("info", "#2");
      await this.appendEditor("sql", "SELECT * from asdf where qwer = 3");
    })();
  }

  clear() {
    this.root.innerText = "";
  }

  private async append(cb: (tag: HTMLDivElement) => unknown) {
    const tag = document.createElement("div");
    await cb(tag);
    tag.classList.add("result-item");
    this.root.appendChild(tag);
  }

  appendPadding() {
    return this.append((tag) => {
      const hr = document.createElement("hr");
      tag.appendChild(hr);
    });
  }

  appendMessage(level: "warn" | "error" | "info", message: string) {
    return this.append((tag) => {
      const msg = document.createElement("div");
      msg.classList.add("message", level);
      msg.innerHTML = message;
      tag.appendChild(msg);
    });
  }

  appendEditor(language: string, value: string) {
    return this.append(async (tag) => {
      const e = await EditorController.init(tag, { language });
      e.setValue(value);
      e.setReadonly(true);
      e.enableCleanBlur();
      e.setHeightByContent();
    });
  }
}
