import { logger } from "../log/logger";

export class HttpUtils {
  static async request(
    method: string,
    url: string,
    headers: any,
    status: Array<number>,
    responseType: "json" | "buffer" | "text",
  ) {
    let count = 2;
    while (count > 0) {
      count -= 1;
      try {
        const res = await fetch(url, {
          method,
          headers: {
            "User-Agent": "kysely-playground",
            ...headers,
          },
        });
        if (!status.includes(res.status)) {
          throw new HttpError(`status is ${res.status}`);
        }
        switch (responseType) {
          case "json":
            return res.json();
          case "buffer":
            return res.arrayBuffer();
          case "text":
            return res.text();
        }
      } catch (e) {
        logger.debug(`retry ${count}`, e);
      }
    }
  }

  static getBytes(url: string): Promise<ArrayBuffer> {
    return HttpUtils.request("GET", url, {}, [200], "buffer");
  }

  static getJson(url: string): Promise<any> {
    return HttpUtils.request("GET", url, {}, [200], "json");
  }

  static getText(url: string): Promise<string> {
    return HttpUtils.request("GET", url, {}, [200], "text");
  }
}

class HttpError extends Error {}
