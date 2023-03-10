import {Settings} from "./settings";
import styles from './index.less';
import {useMount, useNetwork} from 'ahooks';
import {HookService} from "@/services/hook";
import Config from "@/config";

export default () => {
  let {online} = useNetwork();
  useMount(() => {
    HookService.mount2();
  });
  if (online) {
    window.location.href = `https://logspot.hocgin.top/${Config.getProjectId()}`;
  }
  return <div className={styles.options}>
    <Settings/>
  </div>
};
