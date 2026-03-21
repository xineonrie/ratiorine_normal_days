import { FC, useEffect } from 'react';
import styles from './options.module.scss';
import { getStorage } from '@/Core/controller/storage/storageController';
import { useValue } from '@/hooks/useValue';
import { System } from '@/UI/Menu/Options/System/System';
import { Display } from '@/UI/Menu/Options/Display/Display';
import { Sound } from '@/UI/Menu/Options/Sound/Sound';
import useTrans from '@/hooks/useTrans';
import useSoundEffect from '@/hooks/useSoundEffect';
import systemSelectedBg from './materials/system-selected-bg.png'
import displaySelectedBg from './materials/display-selected-bg.png'
import soundSelectedBg from './materials/sound-selected-bg.png'
import icon1 from './materials/settings-icon1.png'
import icon2 from './materials/settings-icon2.png'
import icon3 from './materials/settings-icon3.png'
enum optionPage {
  'System',
  'Display',
  'Sound',
}

export const Options: FC = () => {
  const { playSeEnter, playSeSwitch } = useSoundEffect();
  const currentOptionPage = useValue(optionPage.System);
  useEffect(getStorage, []);

  function getClassName(page: optionPage) {
    if (page === currentOptionPage.value) {
      return styles.Options_page_button + ' ' + styles.Options_page_button_active;
    } else return styles.Options_page_button;
  }

  const t = useTrans('menu.options.');

  return (
    <div className={styles.Options_main}>
      <div className={styles.Options_page_container}>
        <div className={styles.Options_button_list}>
          <div
            onClick={() => {
              currentOptionPage.set(optionPage.System);
              playSeSwitch();
            }}
            className={getClassName(optionPage.System)}
            onMouseEnter={playSeEnter}
          >
            <img src={icon3} className={styles.Option_icon_selected} />
            <img src={systemSelectedBg} className={styles.Option_btn_selected} />
          </div>
          <div
            onClick={() => {
              currentOptionPage.set(optionPage.Display);
              playSeSwitch();
            }}
            className={getClassName(optionPage.Display)}
            onMouseEnter={playSeEnter}
          >
              <img src={icon1} className={styles.Option_icon_selected} />
              <img src={displaySelectedBg} className={styles.Option_btn_selected} />
          </div>
          <div
            onClick={() => {
              currentOptionPage.set(optionPage.Sound);
              playSeSwitch();
            }}
            className={getClassName(optionPage.Sound)}
            onMouseEnter={playSeEnter}
          >
                          <img src={icon2} className={styles.Option_icon_selected} />

             <img src={soundSelectedBg} className={styles.Option_btn_selected} />
          </div>
        </div>
        <div className={styles.Options_main_content}>
          {currentOptionPage.value === optionPage.Display && <Display />}
          {currentOptionPage.value === optionPage.System && <System />}
          {currentOptionPage.value === optionPage.Sound && <Sound />}
        </div>
      </div>
    </div>
  );
};
