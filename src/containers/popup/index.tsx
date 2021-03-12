import React from 'react';
import { Type } from '@/interface';

import './popup.less';

import setting from '@/assets/setting.png';
import feedback from '@/assets/feedback.png';

import Menu from '@/config/menu';
import * as actions from '@/actions/popup';
import isYuquePage from '@/helper/isYuquePage';

function Popup() {
  const [isYuque, setIsYuque] = React.useState<boolean>(false);

  const memoizedIsYuquePage = React.useCallback(async () => {
    const isYuque = await isYuquePage();
    setIsYuque(isYuque);
  }, []);

  React.useEffect(() => void memoizedIsYuquePage(), []);

  const onClickMenu = React.useCallback(async (type: Type, disabled: boolean) => {
    if (disabled) return;

    switch (type) {
      case Type.Markdown:
        await actions.viewMarkdown();
        break;
      case Type.Url:
        await actions.copyUrl();
        break;
    }
  }, []);

  return (
    <div className='yuque-plugin__popup-container'>
      <div className='yuque-plugin__setting'>
        <div className='yuque-plugin__icon-wrapper'>
          <img src={setting} alt='设置' className='yuque-plugin__icon-setting' />
          <span>设置</span>
        </div>
        <div className='yuque-plugin__icon-wrapper'>
          <img src={feedback} alt='反馈' className='yuque-plugin__icon-feedback' />
          <span>反馈</span>
        </div>
      </div>
      <div className='yuque-plugin__menu'>
        {Menu.map(item => {
          const disabled = !item.runOnAnyPage && !isYuque;
          const className = 'yuque-plugin__menu-item'.concat(disabled ? ' disabled' : '');
          return item.visible ? (
            <div key={item.type} className={className} onClick={onClickMenu.bind(null, item.type, disabled)}>
              {item.title}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default Popup;
