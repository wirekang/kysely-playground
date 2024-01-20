export class HttpUtils {
  static async request(
    method: string,
    url: string,
    headers: any,
    status: Array<number>,
    responseType: "json" | "buffer",
  ) {
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
    }
  }

  static async getBytes(url: string) {
    const res = await HttpUtils.request("GET", url, {}, [200], "buffer");
    return res as ArrayBuffer;
  }

  static getJson(url: string): Promise<any> {
    return HttpUtils.request("GET", url, {}, [200], "json");
  }
}

class HttpError extends Error {}
