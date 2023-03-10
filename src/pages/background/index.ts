import {WebExtension} from "@hocgin/browser-addone-kit";
import {ServiceWorkerOptions} from '@hocgin/browser-addone-kit/dist/esm/browser/serviceWorker';
import Config from "@/config";

WebExtension.kit.serviceWorker({
  ...ServiceWorkerOptions.default,
  projectId: Config.getProjectId(),
}, () => {
}, -1);

WebExtension.action.onClicked.addListener((tab: any) => {
  WebExtension.kit.openURL(WebExtension.runtime.getURL(`/$options.html`));
});
