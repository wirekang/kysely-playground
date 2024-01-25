export class ResultController {
  constructor(private readonly root: HTMLDivElement) {
    this.clear();
    this.appendMessage("warn", "This is warning message. Something is happened but it's not fatal.");
    this.appendMessage("error", "This is error message. A key feature is not working.");
    this.appendCode("plaintext", `${new Error("this is the message of catched error").stack}`);
    this.appendPadding();
    this.appendPadding();
    this.appendPadding();
    this.appendPadding();
    this.appendMessage("info", "execute() has been called multiple times.");
    this.appendPadding();
    this.appendMessage("info", "#1");
    this.appendCode(
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
    this.appendPadding();
    this.appendMessage("info", "#2");
    this.appendCode("sql", "SELECT * from asdf where qwer = 3");
  }

  clear() {
    this.root.innerText = "";
  }

  private append(cb: (container: HTMLDivElement) => unknown) {
    const tag = document.createElement("div");
    cb(tag);
    tag.classList.add("result-item");
    this.root.appendChild(tag);
  }

  appendPadding() {
    return this.append((container) => {
      const hr = document.createElement("hr");
      container.appendChild(hr);
    });
  }

  appendMessage(level: "warn" | "error" | "info", message: string) {
    return this.append((container) => {
      const msg = document.createElement("div");
      msg.classList.add("message", level);
      msg.textContent = message;
      container.appendChild(msg);
    });
  }

  appendCode(language: string, value: string) {
    return this.append((container) => {
      const w = document.createElement("pre");
      w.classList.add("code");
      const code = document.createElement("code");
      code.classList.add(`language-${language}`, "hljs");
      code.textContent = value;
      w.appendChild(code);
      container.appendChild(w);
    });
  }
}
