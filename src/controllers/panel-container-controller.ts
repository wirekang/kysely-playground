import { CssUtils } from "../lib/utility/css-utils";
import { logger } from "../lib/utility/logger";

export class PanelContainerController {
  private readonly borders: Record<string, HTMLElement>;
  private sizes: Record<string, number>;
  constructor(
    private readonly container: HTMLElement,
    private readonly panels: Array<HTMLElement>,
  ) {
    this.borders = {};
    this.sizes = {};
    panels.forEach((p, i) => {
      const id = p.getAttribute("id");
      if (!id) {
        throw Error("no id");
      }
      this.sizes[id] = 0;
      if (i === panels.length - 1) {
        return;
      }
      const border = document.createElement("div");
      border.classList.add("border");
      container.appendChild(border);
      this.borders[id] = border;
    });

    new ResizeObserver(() => {
      this.layout();
    }).observe(container);
    this.panels.forEach((it) => {
      new MutationObserver(() => {
        this.layout();
      }).observe(it, { attributes: true, attributeFilter: ["hidden"] });
    });
    this.layout();
  }

  private layout() {
    this.resetHidden();
    this.resize();
    const wide = CssUtils.isWideScreen();

    let start = 0;
    this.getItems().forEach(({ id, panel, size, border }, i) => {
      const { setStart, setSize } = makePositioner(wide, panel);
      setStart(start);
      setSize(size);
      start += size;
    });
  }

  private resize() {
    logger.debug("resize");
    const cs = CssUtils.isWideScreen() ? this.container.clientWidth : this.container.clientHeight;
    logger.debug("cw", cs);
    let ts = 0;
    let length = 0;
    this.getItems().forEach(({ size }) => {
      ts += size;
      length++;
    });
    const tp = cs - ts;
    const ep = tp / length;
    logger.debug("ts", ts, "lenth", length, "tp", tp, "ep", ep);
    logger.debug(this.sizes);
    this.getItems().forEach(({ id, size }) => {
      this.sizes[id] = size + ep;
    });
  }

  private getItems() {
    const items = this.panels
      .filter((it) => !it.hasAttribute("hidden"))
      .map((panel) => {
        const id = panel.getAttribute("id")!;
        return {
          id,
          panel,
          size: this.sizes[id],
          border: this.borders[id] as HTMLElement | undefined,
        };
      });
    logger.debug("items", items);
    return items;
  }

  private resetHidden() {
    this.panels
      .filter((it) => it.hasAttribute("hidden"))
      .forEach((panel) => {
        const id = panel.getAttribute("id")!;
        panel.style.removeProperty("left");
        panel.style.removeProperty("right");
        panel.style.removeProperty("top");
        panel.style.removeProperty("bottom");
        panel.style.removeProperty("width");
        panel.style.removeProperty("height");
      });
  }

  resetSizes() {
    this.getItems().forEach(({ id }) => {
      this.sizes[id] = 0;
    });
  }
}

function px(v: number) {
  return `${v}px`;
}

function makePositioner(wide: boolean, e: HTMLElement) {
  return {
    setStart: (v: number) => {
      if (wide) {
        e.style.left = px(v);

        e.style.top = px(0);
        e.style.bottom = px(0);
      } else {
        e.style.top = px(v);

        e.style.left = px(0);
        e.style.right = px(0);
      }
    },
    setSize: (v: number) => {
      if (wide) {
        e.style.width = px(v);

        e.style.removeProperty("height");
      } else {
        e.style.height = px(v);

        e.style.removeProperty("width");
      }
    },
  };
}
