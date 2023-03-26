import {Settings} from "./settings";
import styles from './index.less';
import {useMount, useNetwork} from 'ahooks';
import {LoadingOutlined} from '@ant-design/icons';
import {HookService} from "@/services/hook";
import Config from "@/config";
import {Spin} from "antd";

let Loading = () => <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>;

export default () => {
  let {online} = useNetwork();
  useMount(() => {
    HookService.mount2();
  });
  if (online) {
    window.location.href = `https://logspot.hocgin.top/${Config.getProjectId()}?active=setting`;
    return <div style={{height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center'}}>
      <Loading/>
    </div>
  }
  return <div className={styles.options}>
    <Settings/>
  </div>
};
