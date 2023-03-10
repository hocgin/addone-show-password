import AppStorage from "@/_utils/storage";
import {TriggerType} from "@/_types";
import $ from "jquery";


export class HookService {


  static async mount2() {
    let toggleType = type => (`${type}`.toLowerCase() === 'password') ? 'text' : 'password';

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
        target.type = toggleType(target.type);
      } else if (TriggerType.FocusClick === triggerType && eventType === 'click') {
        target.type = toggleType(target.type);
      } else if (TriggerType.KeydownClick === triggerType && control && eventType === 'click') {
        target.type = toggleType(target.type);
      }
    });

  }

}
