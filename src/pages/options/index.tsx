import {Settings} from "./settings";
import styles from './index.less';
import {useMount} from 'ahooks';
import {HookService} from "@/services/hook";

export default () => {
  useMount(() => {
    HookService.mount2();
  });

  return <div className={styles.options}>
    <Settings/>
  </div>
};
