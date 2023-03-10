import AppStorage from "@/_utils/storage";
import {TriggerType} from "@/_types";
import $ from "jquery";
import {WebExtension} from "@hocgin/browser-addone-kit";


export class HookService {


  static async mount2() {
    let toggleType = async type => {
      let isShowPassword = `${type}`.toLowerCase() === 'password';
      let targetType = isShowPassword ? 'text' : 'password';
      let currentTab = await WebExtension.kit.getCurrentTab();
      WebExtension.action.setIcon({
        tabId: currentTab?.id,
        path: isShowPassword ? `/logo.show.png` : `/logo.png`
      });
      return targetType;
    };

    // 移出回归原样
    let $passwordInput = $("input[type='password']");
    $passwordInput.on('blur', (e) => {
      let target = e?.target;
      target.type = 'password';
    });

    // 按下关键键
    let control = false;
    $(document).on('keyup keydown', async (e) => {
      let {keydownCode} = await AppStorage.getUserSetting();
      let eventType = e?.type;
      control = e?.[keydownCode] && eventType === 'keydown';
    });

    // 点击 / 双击
    $passwordInput.on('click dblclick', async (e) => {
      let {triggerType, keydownCode} = await AppStorage.getUserSetting();
      let eventType = e?.type;
      let target = e?.target;
      if (TriggerType.DoubleClick === triggerType && eventType === 'dblclick') {
        target.type = await toggleType(target.type);
      } else if (TriggerType.FocusClick === triggerType && eventType === 'click') {
        target.type = await toggleType(target.type);
      } else if (TriggerType.KeydownClick === triggerType && control && eventType === 'click') {
        target.type = await toggleType(target.type);
      }
    });

  }

}
