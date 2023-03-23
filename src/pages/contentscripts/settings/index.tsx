import ReactDOM from "react-dom";
import {Settings} from "@/pages/options/settings";

document.addEventListener("DOMContentLoaded", () => {
  let elementId = 'addone-show-password';
  let element = document.getElementById(elementId);
  console.log('element', element);
  if (!element) return;
  new MutationObserver(() => {
    let newElement = document.createElement('div');
    ReactDOM.render(<Settings/>, newElement, () => element!.replaceWith(newElement));
  }).observe(element, {attributes: true, childList: true, subtree: true});
});

