import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fullScreenOption } from '@/store/userDataInterface';
import { setMenuPanelTag, setVisibility } from '@/store/GUIReducer';
import { MenuPanelTag } from '@/store/guiInterface';
import useTrans from '@/hooks/useTrans';
import useSoundEffect from '@/hooks/useSoundEffect';
import useApplyStyle from '@/hooks/useApplyStyle';
import { keyboard } from '@/hooks/useHotkey';
import useConfigData from '@/hooks/useConfigData';
import { playBgm } from '@/Core/controller/stage/playBgm';
import { continueGame, startGame } from '@/Core/controller/gamePlay/startContinueGame';
import { showGlogalDialog } from '../GlobalDialog/GlobalDialog';
import styles from './title.module.scss';

import upperLeft from './material/cover-upper.png';
import bottomRight from './material/cover-down.png';
import titleImg from './material/cover-title.png';
import option1Bg from './material/option1-bg.png';
import option1Icon from './material/option1-icon.png';
import option2Bg from './material/option2-bg.png';
import option2Icon from './material/option2-icon.png';
import option3Bg from './material/option3-bg.png';
import option3Icon from './material/option3-icon.png';
import option4Bg from './material/option4-bg.png';
import option4Icon from './material/option4-icon.png';
import option5Bg from './material/option5-bg.png';
import option5Icon from './material/option5-icon.png';
import option6Bg from './material/option6-bg.png';
import option6Icon from './material/option6-icon.png';
import { useEffect } from 'react';


/** 标题页 */
export default function Title() {
  const userDataState = useSelector((state: RootState) => state.userData);
  const GUIState = useSelector((state: RootState) => state.GUI);
  const dispatch = useDispatch();
  const fullScreen = userDataState.optionData.fullScreen;
  const background = GUIState.titleBg;
  const showBackground = background === '' ? 'rgba(0,0,0,1)' : `url("${background}")`;
  const t = useTrans('title.');
  const tCommon = useTrans('common.');
  const { playSeEnter, playSeClick } = useSoundEffect();

  const applyStyle = useApplyStyle('title');
  useConfigData(); // 监听基础ConfigData变化

  const appreciationItems = useSelector((state: RootState) => state.userData.appreciationData);
  const hasAppreciationItems = appreciationItems.bgm.length > 0 || appreciationItems.cg.length > 0;

useEffect(() => {
  const element = document.querySelector(`.${styles.parallax_layer}`)

const handleMouseMove = (e: MouseEvent) => {
  if (!(element instanceof HTMLElement)) return;

  const dx = (e.clientX / window.innerWidth - 0.5) * 10;
  const dy = (e.clientY / window.innerHeight - 0.5) * 10;

  element.style.setProperty("--x", `${dx}px`);
  element.style.setProperty("--y", `${dy}px`);
};
  window.addEventListener("mousemove", handleMouseMove)

  return () => {
    window.removeEventListener("mousemove", handleMouseMove)
  }
}, [])
  return (
    <>
        
      <div
        className="title__enter-game-target"
        onClick={() => {
          playBgm(GUIState.titleBgm);
          dispatch(setVisibility({ component: 'isEnterGame', visibility: true }));
          if (fullScreen === fullScreenOption.on) {
            document.documentElement.requestFullscreen();
            if (keyboard) keyboard.lock(['Escape', 'F11']);
          }
        }}
        onMouseEnter={playSeEnter}
      />
      {GUIState.showTitle && (
        <div
          className={applyStyle('Title_main', styles.Title_main)}
          style={{
            backgroundImage: showBackground,
            backgroundSize: 'cover',
          }}
        >
          <div className={applyStyle('parallax_layer', styles.parallax_layer)}>
            <img className={applyStyle('Title_background_top', styles.Title_backup_top)} src={upperLeft} />
            <img className={applyStyle('Title_background_bottom', styles.Title_backup_bottom)} src={bottomRight} />
          </div>
          <div className={applyStyle('Title_wrapper', styles.Title_wrapper)}>
              <img className={applyStyle('Title_img', styles.Title_img)} src={titleImg} />
          </div>
          <p  className={applyStyle('bottom_text', styles.bottom_text)}>Non-commercial fan game based on Honkai: Star Rail<br />Original assets © SeO2 | Honkai: Star Rail © HoYovers</p>
          <div className={applyStyle('Title_buttonList', styles.Title_buttonList)}>
            <div
              className={applyStyle('Title_button', styles.Title_button)}
              onClick={() => {
                startGame();
                playSeClick();
              }}
              onMouseEnter={playSeEnter}
            >
              <img className={applyStyle('option_icon', styles.option_icon)} src={option1Icon} />
              <img src={option1Bg} />
            </div>
            <div
              className={applyStyle('Title_button2', styles.Title_button2)}
              onClick={async () => {
                playSeClick();
                dispatch(setVisibility({ component: 'showTitle', visibility: false }));
                continueGame();
              }}
              onMouseEnter={playSeEnter}
            >
              <img className={applyStyle('option_icon', styles.option_icon)} src={option2Icon} />
               <img src={option2Bg} />
            </div>
            <div
              className={applyStyle('Title_button', styles.Title_button)}
              onClick={() => {
                playSeClick();
                dispatch(setVisibility({ component: 'showMenuPanel', visibility: true }));
                dispatch(setMenuPanelTag(MenuPanelTag.Option));
              }}
              onMouseEnter={playSeEnter}
            >
              <img className={applyStyle('option_icon', styles.option_icon)} src={option3Icon} />
              <img src={option3Bg} />
            </div>
            <div
              className={applyStyle('Title_button4', styles.Title_button4)}
              onClick={() => {
                playSeClick();
                dispatch(setVisibility({ component: 'showMenuPanel', visibility: true }));
                dispatch(setMenuPanelTag(MenuPanelTag.Load));
              }}
              onMouseEnter={playSeEnter}
            >
             <img className={applyStyle('option_icon', styles.option_icon)} src={option4Icon} />
              <img src={option4Bg} />
            </div>
            {GUIState.enableAppreciationMode && (
              <div
                className={`${applyStyle('Title_button', styles.Title_button)} ${
                  !hasAppreciationItems ? styles.Title_button_disabled : ''
                }`}
                onClick={() => {
                  if (hasAppreciationItems) {
                    playSeClick();
                    dispatch(setVisibility({ component: 'showExtra', visibility: true }));
                  }
                }}
                onMouseEnter={playSeEnter}
              >
              <img className={applyStyle('option_icon', styles.option_icon)} src={option5Icon} />
              <img src={option5Bg} />
              </div>
            )}
            <div
              className={applyStyle('Title_button6', styles.Title_button6)}
              onClick={() => {
                playSeClick();
                showGlogalDialog({
                  title: t('exit.tips'),
                  leftText: tCommon('yes'),
                  rightText: tCommon('no'),
                  leftFunc: () => {
                    window.close();
                  },
                  rightFunc: () => {},
                });
              }}
              onMouseEnter={playSeEnter}
            >
              <img className={applyStyle('option_icon', styles.option_icon)} src={option6Icon} />
              <img src={option6Bg} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
