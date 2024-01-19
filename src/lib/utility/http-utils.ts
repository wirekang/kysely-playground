import axios, { ResponseType, responseEncoding } from "axios";

export class HttpUtils {
  static request(
    method: string,
    url: string,
    headers: any,
    status: Array<number>,
    responseType: ResponseType,
    responseEncoding: responseEncoding,
  ) {
    return axios.request({
      method,
      url,
      headers: {
        "User-Agent": "kysely-playground",
        ...headers,
      },
      validateStatus: status.includes.bind(status),
      responseType,
      responseEncoding,
    });
  }

  static async getBytes(url: string) {
    return (await HttpUtils.request("GET", url, {}, [200], "arraybuffer", "binary")).data as ArrayBuffer;
  }

  static async getJson(url: string) {
    return (await HttpUtils.request("GET", url, {}, [200], "json", "utf-8")).data as any;
  }
}
