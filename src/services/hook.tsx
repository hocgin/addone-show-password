import AppStorage from "@/_utils/storage";
import {TriggerType} from "@/_types";
import $ from "jquery";


export class HookService {

  static async mount() {
    let {triggerType, keydownCode} = await AppStorage.getUserSetting();

    let $passwordInput = $("input[type='password']");
    let changeInputType = (e) => {
      console.log('触发', e);
      let target = e?.target;
      let eventType = e?.type;
      let type = target?.type;
      if (eventType === 'blur') {
        target.type = 'password';
      } else {
        let isPassword = `${type}`.toLowerCase() === 'password';
        target.type = isPassword ? 'text' : 'password';
      }
    };

    // 双击
    if (TriggerType.DoubleClick === triggerType) {
      $passwordInput.on('dblclick blur', changeInputType);
    }
    // 移入 + 点击
    else if (TriggerType.FocusClick === triggerType) {
      $passwordInput.on('focus blur', (e) => {
        console.log('event', e);
        let $target = $(e?.target);
        let eventType = e?.type;
        // 移出
        if (eventType === 'blur') {
          $target.off('click', changeInputType);
          changeInputType(e);
        }
        // 移入
        else if (eventType === 'focus') {
          $target.on('click', changeInputType);
        }
      });
    }
    // 长按(metaKey/ctrlKey) + 点击
    else if (TriggerType.KeydownClick === triggerType) {
      let control = false;
      $(document).on('keyup keydown', (e) => {
        let eventType = e?.type;
        control = e?.[keydownCode] && eventType === 'keydown';
        console.log('e', e);
      });
      $passwordInput.on('click blur', (e) => {
        let eventType = e?.type;
        if (control) {
          changeInputType(e);
        } else if (eventType === 'blur') {
          changeInputType(e);
        }
      });
    }
  }


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
