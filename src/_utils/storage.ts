import {PlatformKit} from '@hocgin/hkit';
import {KeydownCode, StorageKeys, TriggerType} from "@/_types";
import {storageKit} from "@hocgin/browser-addone-kit";

export interface UserSettingType {
  triggerType: TriggerType;
  keydownCode?: string;
}

export default class AppStorage {
  static async getUserSetting() {
    let values = (await storageKit.getAsync(StorageKeys.Settings));
    console.log('读取', values);
    return Object.assign({
      triggerType: TriggerType.DoubleClick,
      keydownCode: PlatformKit.isMacOS ? KeydownCode.MetaKey : KeydownCode.CtrlKey,
    }, values) as UserSettingType;
  }

  static async setUserSetting(values: UserSettingType) {
    await storageKit.setAsync(StorageKeys.Settings, values);
  }
}
