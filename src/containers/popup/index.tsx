import React from 'react';
import { Type } from '@/interface';

import './popup.less';

import setting from '@/assets/setting.png';
import feedback from '@/assets/feedback.png';

import Menu from '@/config/menu';
import * as actions from '@/actions';
import isYuquePage from '@/utils/isYuquePage';

const isYuque = isYuquePage();

function Popup() {
  const onClickMenu = React.useCallback((type: Type) => {
    switch (type) {
      case Type.Markdown: {
        void actions.viewMarkdown();
      }
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
          return item.visible ? (
            <div key={item.type} className='yuque-plugin__menu-item' onClick={onClickMenu.bind(null, item.type)}>
              {item.title}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default Popup;
