import ReactDOM from "react-dom";
import {Settings} from "@/pages/options/settings";
// @ts-ignore
import insertionQ from 'insertion-query';
import Config from "@/config";

let elementId = Config.getProjectId();
document.addEventListener("DOMContentLoaded", () => {
  let element = document.getElementById(elementId);
  let replaceComponent = (element: any) => {
    let newElement = document.createElement('div');
    ReactDOM.render(<Settings/>, newElement, () => element!.replaceWith(newElement));
  };
  // 已有节点
  if (element) {
    new MutationObserver(() => replaceComponent(element)).observe(element, {
      attributes: true, childList: true, subtree: true
    });
  }
  // 无节点，持续监控
  insertionQ(`#${elementId}`).every(replaceComponent);
});
