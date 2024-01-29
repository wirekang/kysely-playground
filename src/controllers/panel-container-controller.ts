import { CssUtils } from "../lib/utility/css-utils";
import { logger } from "../lib/utility/logger";

// TODO
// needs refactoring
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
      const borderLine = document.createElement("div");
      borderLine.classList.add("line");
      border.appendChild(borderLine);
      container.appendChild(border);
      let dragging = false;
      let wide = CssUtils.isWideScreen();
      border.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragging = true;
        wide = CssUtils.isWideScreen();
      });
      window.addEventListener("mousemove", (e) => {
        if (!dragging) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        let delta: number;
        if (wide) {
          delta = e.movementX;
        } else {
          delta = e.movementY;
        }
        const items = this.getItems();
        const itemIndex = items.findIndex((it) => it.id === id);
        if (itemIndex === -1) {
          logger.warn("It seems panel hided while dragging");
          return;
        }
        const current = items[itemIndex];
        const after = items[itemIndex + 1];
        this.sizes[current.id] += delta;
        this.sizes[after.id] -= delta;
        if (this.sizes[current.id] < 50 || this.sizes[after.id] < 50) {
          this.sizes[current.id] -= delta;
          this.sizes[after.id] += delta;
          return;
        }

        this.layout();
      });
      window.addEventListener("mouseup", (e) => {
        if (!dragging) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        dragging = false;
      });
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
    this.getItems().forEach(({ id, panel, size, border }) => {
      const pp = makePositioner(wide, panel);
      pp.setStart(start);
      pp.setSize(size);
      start += size;
      if (!border) {
        return;
      }
      const bp = makePositioner(wide, border);
      bp.setStart(start - 8);
      bp.setSize(16);
    });
  }

  private resize() {
    const cs = CssUtils.isWideScreen() ? this.container.clientWidth : this.container.clientHeight;
    let ts = 0;
    let length = 0;
    this.getItems().forEach(({ size }) => {
      ts += size;
      length++;
    });
    const tp = cs - ts;
    const ep = tp / length;
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
    return items;
  }

  private resetHidden() {
    this.panels
      .filter((it) => it.hasAttribute("hidden"))
      .forEach((panel) => {
        panel.style.removeProperty("left");
        panel.style.removeProperty("right");
        panel.style.removeProperty("top");
        panel.style.removeProperty("bottom");
        panel.style.removeProperty("width");
        panel.style.removeProperty("height");
        const border = this.borders[panel.getAttribute("id")!];
        if (border) {
          border.style.removeProperty("left");
          border.style.removeProperty("right");
          border.style.removeProperty("top");
          border.style.removeProperty("bottom");
          border.style.removeProperty("width");
          border.style.removeProperty("height");
        }
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
