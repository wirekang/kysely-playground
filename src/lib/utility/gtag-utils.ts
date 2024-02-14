export class GtagUtils {
  static init(params: any) {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", "G-G1QNWZ9NSP", { ...params });
  }

  static event(name: string, params: any = {}) {
    // @ts-ignore
    window.gtag("event", name, params);
  }
}
