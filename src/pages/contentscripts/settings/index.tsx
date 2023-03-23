import ReactDOM from "react-dom";
import {Settings} from "@/pages/options/settings";

let elementId = 'addone-show-password';
document.addEventListener("DOMContentLoaded", () => new MutationObserver(() => {
  let element = document.getElementById(elementId);
  console.log('element', element);
  if (!element) return;
  let newElement = document.createElement('div');
  ReactDOM.render(<Settings/>, newElement, () => element!.replaceWith(newElement));
}).observe(document.body, {childList: true, subtree: true}));

