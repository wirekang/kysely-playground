import { LogLevel } from "src/lib/log/types/LogLevel"
import { EnvConstants } from "src/lib/env/EnvConstants"

export class LogUtils {
  public static info(...messages: any[]) {
    LogUtils.log("info", messages)
  }

  public static warn(...messages: any[]) {
    LogUtils.log("warn", messages)
  }

  public static error(...messages: any[]) {
    LogUtils.log("error", messages)
  }

  private static log(level: LogLevel, message: any[]) {
    let f = console.log
    switch (level) {
      case "info":
        if (EnvConstants.PROD) {
          return
        }
        f = console.info
        break
      case "warn":
        f = console.warn
        break
      case "error":
        f = console.error
        break
    }
    f(...message)
  }
}
