import React, { useEffect, useRef } from "react";
import Snap, { Paper, Element as SnapElement } from "snapsvg";
import html2canvas from "html2canvas";
import "./index.css";

interface MoveSvgRect {
  rect: GanttTree;
  type: string;
  offsetX: number;
  offsetW: number;
}

let currentSvgReact: MoveSvgRect | null = null;
const ONEDAY = 100;
const lineHeight = 12;

function GanttChart(props: any) {
  const height = 300;
  const dates = ["5月26日", "5月27日"];
  useEffect(() => {
    const snapSvgBox = Snap("#snapsvg_box");
    addSnapSvgBoxEvent(snapSvgBox);
    const tree: GanttTree[] = [];
    const one = createLine(snapSvgBox, tree, null);
    createLine(snapSvgBox, one.children, one);
    createLine(snapSvgBox, one.children, one);
  });
  return (
    <div className="gantt-chart-contain">
      <GanttChartBg width={ONEDAY} height={height} dates={dates} />
      <svg className="gantt-chart-svg" id="snapsvg_box" width={300} height={height}></svg>
    </div>
  );
}

function GanttChartTitle() {}

function adsorb(offsetX: number, minTime: number, d = 5) {
  return offsetX % minTime < d || offsetX % minTime > minTime - d;
}

function getDay(offsetX: number, minTime: number) {
  return Math.round(offsetX / minTime) / 2;
}

function addSnapSvgBoxEvent(snapSvgBox: Paper) {
  const minTime = ONEDAY / 2;
  snapSvgBox.mousemove(function(this: SnapElement, e) {
    if (currentSvgReact) {
      if (currentSvgReact.type === "w") {
        // 自动吸附
        if (adsorb(e.offsetX, minTime)) {
          const d = getDay(e.offsetX, minTime);
          const rect = currentSvgReact.rect;
          const w = ONEDAY * d - rect.x;
          if (w > 0) {
            setWTreeRect(rect, w);
          }
        }
      } else if (currentSvgReact.type === "x") {
        const offsetX = e.offsetX - currentSvgReact.offsetW;
        if (adsorb(offsetX, minTime)) {
          const x = ONEDAY * getDay(offsetX, minTime);
          const parent = currentSvgReact.rect.parent;
          if (x >= 0 && (!parent || x >= parent.x)) {
            setXTreeRect(currentSvgReact.rect, x);
          }
        }
      }
    }
  });

  document.addEventListener("mouseup", () => {
    currentSvgReact = null;
  });
}

// 长度拉伸
function setWTreeRect(react: GanttTree, w: number) {
  react.w = w;
  redrawLine(react);
  if (react.parent) {
    if (react.parent.children.every(r => r.w + r.x <= react.x + react.w)) {
      setWTreeRect(react.parent, react.x + react.w - react.parent.x);
    }
  }
}

// 左右移动
function setXTreeRect(react: GanttTree, x: number) {
  const d = x - react.x;
  react.x = x;
  redrawLine(react);
  if (react.parent) {
    if (react.parent.children.every(r => r.w + r.x <= react.x + react.w)) {
      setWTreeRect(react.parent, react.x + react.w - react.parent.x);
    }
  }
  if (react.children.length > 0) {
    react.children.forEach(r => {
      setXTreeRect(r, r.x + d);
    });
  }
}

type ParentTree = GanttTree | null;

interface GanttTree {
  name?: string;
  user?: string;
  w: number;
  x: number;
  seq: number;
  parent: ParentTree;
  children: GanttTree[];
  svg: SnapElement;
  userSvg?: SnapElement;
}

function createLinePath(x: number, y: number, width: number, height: number) {
  const w = x + width;
  const h = y + height;
  return `M${x},${y}L${w},${y}L${w},${h + 3}L${w - 6},${h}L${x + 6},${h}L${x},${h + 3}Z`;
}

function seqTop(seq: number) {
  return seq * 22 + 8;
}

function createTreeLinePath(tree: GanttTree) {
  return createLinePath(tree.x, seqTop(tree.seq), tree.w, lineHeight);
}

function createPathLine(snapSvgBox: Paper, tree: GanttTree) {
  return snapSvgBox
    .path(createTreeLinePath(tree))
    .attr({ stroke: "#3f62a4", "stroke-width": 1, fill: "#7eaffc" })
    .mousedown(createMousedown(tree));
}

function createNormalLine(snapSvgBox: Paper, tree: GanttTree) {
  return snapSvgBox
    .rect(tree.x, seqTop(tree.seq), tree.w, lineHeight, 2, 2)
    .attr({ stroke: "#3f62a4", "stroke-width": 1, fill: "#7eaffc" })
    .mousedown(createMousedown(tree));
}

function createLineText(snapSvgBox: Paper, tree: GanttTree) {
  return snapSvgBox
    .text(tree.x + tree.w + 6, seqTop(tree.seq) + lineHeight / 2, tree.user || "")
    .attr({
      "font-size": "13",
      "dominant-baseline": "middle",
      "user-select": "none"
    });
}

function createMousedown(tree: GanttTree) {
  return function(e: MouseEvent) {
    currentSvgReact = {} as MoveSvgRect;
    currentSvgReact.offsetX = e.offsetX;
    currentSvgReact.offsetW = e.offsetX - tree.x;
    currentSvgReact.rect = tree;
    if (e.offsetX - tree.x > tree.w - 10) {
      if (tree.children.length > 0) return (currentSvgReact = null);
      currentSvgReact.type = "w";
    } else {
      currentSvgReact.type = "x";
    }
  };
}

function redrawLine(tree: GanttTree) {
  const rect = tree.svg;
  if (rect.type === "rect") {
    rect.attr({
      x: tree.x,
      y: seqTop(tree.seq),
      width: tree.w
    });
  } else if (rect.type === "path") {
    rect.attr({
      d: createTreeLinePath(tree)
    });
  }
  if (tree.userSvg) {
    tree.userSvg.attr({
      x: tree.x + tree.w + 6,
      y: seqTop(tree.seq) + lineHeight / 2
    });
  }
}

interface GanttDataTree {
  name: string;
  day: number;
  start: number;
  seq: number;
}

function initLine(snapSvgBox: Paper, trees: GanttDataTree[], parent: GanttTree | null) {
  trees.forEach(data => {
    const tree = {} as GanttTree;
    tree.name = data.name;
    tree.w = data.day * ONEDAY;
    tree.seq = data.seq;
    tree.parent = parent;
  });
}

function createLine(snapSvgBox: Paper, brotherTree: GanttTree[], parentTree: ParentTree) {
  const x = (parentTree && parentTree.x) || 0;
  const len = brotherTree.length;
  const seq = ((parentTree && parentTree.seq) || 0) + len + 1;
  const tree = {} as GanttTree;
  tree.name = "Task";
  tree.user = "";
  tree.w = ONEDAY;
  tree.x = x;
  tree.seq = seq;
  tree.parent = parentTree;
  tree.children = [];
  tree.svg = createNormalLine(snapSvgBox, tree);
  // tree.userSvg = createLineText(snapSvgBox, tree);
  brotherTree.push(tree);
  if (parentTree && len === 0) {
    parentTree.svg.remove();
    parentTree.svg = createPathLine(snapSvgBox, parentTree);
  }
  return tree;
}

function GanttChartBg(props: any) {
  const style = {
    height: props.height,
    backgroundColor: "#ffffff"
  };
  const itemStyle = {
    width: props.width
  };
  return (
    <div className="gantt-chart-bg-contain" style={style}>
      {props.dates.map((date: string) => (
        <div className="gantt-chart-bg-item" style={itemStyle} key={date}>
          <div className="gantt-chart-bg-title">{date}</div>
          <div className="gantt-chart-bg-column"></div>
        </div>
      ))}
    </div>
  );
}

function initGanttChartBg(snapSvgBox: Paper, dates: string[], snapSvgBoxHeight: number) {
  const width = 100;
  const height = 22;
  const top = 0;
  dates.forEach((date: string, i: number) => {
    titleColumn(snapSvgBox, i * width, top, width, height, date, snapSvgBoxHeight);
  });
}

function titleColumn(
  snapSvgBox: Paper,
  x: number,
  y: number,
  width: number,
  height: number,
  text: string,
  snapSvgBoxHeight: number
) {
  snapSvgBox
    .rect(x, y, width, snapSvgBoxHeight)
    .attr({ stroke: "#ededed", "stroke-width": 1, fill: "#ffffff" });
  rectText(snapSvgBox, x, y, width, height, text);
}

function rectText(
  snapSvgBox: Paper,
  x: number,
  y: number,
  width: number,
  height: number,
  text: string
) {
  snapSvgBox
    .rect(x, y, width, height)
    .attr({ stroke: "#ededed", "stroke-width": 1, fill: "#ffffff" });
  snapSvgBox.text(x + (width + 2) / 2, y + (height + 2) / 2, text).attr({
    "font-size": "14",
    "text-anchor": "middle",
    "dominant-baseline": "middle"
  });
}

export default GanttChart;
