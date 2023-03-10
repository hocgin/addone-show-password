import {WebExtension} from "@hocgin/browser-addone-kit";

WebExtension.action.onClicked.addListener((tab: any) => {
  WebExtension.kit.openURL(WebExtension.runtime.getURL(`/$options.html`));
});
