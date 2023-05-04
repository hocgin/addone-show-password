import {App, Divider, Form, Input, Popover, Radio, Select} from "antd";
import {KeydownCode, TriggerType} from "@/_types";
import styles from './index.less';
import {useRequest} from "ahooks";
import AppStorage from "@/_utils/storage";
import {Theme} from "@/components";
import {I18nKit} from "@hocgin/browser-addone-kit";

let SettingsX = () => {
  let {message} = App.useApp();
  const [form] = Form.useForm();
  useRequest(async () => (await AppStorage.getUserSetting()), {
    onSuccess: values => {
      form.setFieldsValue(values);
    },
  });
  let $setUserSettings = useRequest(AppStorage.setUserSetting, {
    manual: true,
    onSuccess: () => message.success(`${I18nKit.getMessageOrDefault('change_ok', '操作成功')}`),
  });

  return <div className={styles.page}>
    <Divider orientation='left'>{I18nKit.getMessageOrDefault('settings', '配置')}</Divider>
    <Form form={form} labelCol={{span: 3}}
          onValuesChange={(_) => {
            let values = form.getFieldsValue();
            $setUserSettings.run(values);
          }} colon={false}>
      <Form.Item name={'triggerType'} label={I18nKit.getMessageOrDefault('trigger_type', '触发方式')}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button
            value={TriggerType.DoubleClick}>{I18nKit.getMessageOrDefault('doubleclick', '双击')}</Radio.Button>
          <Radio.Button
            value={TriggerType.FocusClick}>{I18nKit.getMessageOrDefault('focusclick', '单击')}</Radio.Button>
          <Radio.Button
            value={TriggerType.KeydownClick}>{I18nKit.getMessageOrDefault('keydownclick', '按键+点击')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.triggerType !== curValues.triggerType} noStyle>
        {({getFieldValue}) => {
          let triggerType = getFieldValue(['triggerType']);
          return <>
            <Form.Item name={'keydownCode'} label={I18nKit.getMessageOrDefault('keycode_group', '配合按键')}
                       hidden={triggerType !== TriggerType.KeydownClick}>
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={KeydownCode.MetaKey}>Meta</Radio.Button>
                <Radio.Button value={KeydownCode.CtrlKey}>Ctrl</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </>
        }}
      </Form.Item>
    </Form>
    <Divider orientation='left'>{I18nKit.getMessageOrDefault('test_area', '测试区')}</Divider>
    <Input.Password defaultValue={'this is test..'}/>
  </div>;
}


export let Settings = () => <Theme>
  <SettingsX/>
</Theme>
