export const logger = {
  debug: (...messages: Array<any>) => {
    log(0, messages);
  },
  info: (...messages: Array<any>) => {
    log(1, messages);
  },
  warn: (...messages: Array<any>) => {
    log(2, messages);
  },
  error: (...messages: Array<any>) => {
    log(3, messages);
  },
};

const MIN_LEVEL = import.meta.env.DEV || import.meta.env.VITE_PREVIEW ? 0 : 1;
const PREFIXES = ["DBG", "INF", "WRN", "ERR"];
const PREFIX_COLORS = ["#bbb", "#fff", "#fb6", "#f66"];

function log(level: number, messages: Array<any>) {
  if (level < MIN_LEVEL) {
    return;
  }
  console.log(
    `%c ${PREFIXES[level]} %c ${messages.join(" ")}`,
    `background-color: #000; color: ${PREFIX_COLORS[level]}`,
    `backgrond-color: none; color:none;`,
  );
}
