import AppStorage from "@/_utils/storage";
import {TriggerType} from "@/_types";
import $ from "jquery";


export class HookService {


  static async mount2() {
    let toggleType = async type => {
      let isShowPassword = `${type}`.toLowerCase() === 'password';
      // let currentTab = await WebExtension.kit.getCurrentTab();
      // WebExtension.action.setIcon({
      //   // tabId: currentTab?.id,
      //   path: isShowPassword ? `/logo.show.png` : `/logo.png`
      // });
      return isShowPassword ? 'text' : 'password';
    };

    // 移出回归原样
    let inputPasswordSelector = "input[type='password'],input[flagtype='password']";
    $(document).on('blur', inputPasswordSelector, (e) => {
      let target = e?.target ?? {};
      $(target).attr('flagtype', `password`);

      target.type = 'password';
    });

    // 点击 / 双击
    $(document).on('click dblclick', inputPasswordSelector, async (e) => {
      let target = e?.target ?? {};
      $(target).attr('flagtype', `password`);

      let {triggerType, keydownCode} = await AppStorage.getUserSetting();
      let eventType = e?.type;
      if (TriggerType.DoubleClick === triggerType && eventType === 'dblclick') {
        target.type = await toggleType(target.type);
      } else if (TriggerType.FocusClick === triggerType && eventType === 'click') {
        target.type = await toggleType(target.type);
      } else if (TriggerType.KeydownClick === triggerType && control && eventType === 'click') {
        target.type = await toggleType(target.type);
      }
    });

    // 按下关键键
    let control = false;
    $(document).on('keyup keydown', async (e) => {
      let {keydownCode} = await AppStorage.getUserSetting();
      let eventType = e?.type;
      control = e?.[keydownCode] && eventType === 'keydown';
    });

  }

}
