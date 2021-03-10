import React from 'react';

import './popup.less';

import menu from '@/config/menu';
import setting from '@/assets/setting.png';
import feedback from '@/assets/feedback.png';

function Popup() {
  return (
    <div className='yuque-plugin__popup-container'>
      <div className='yuque-plugin__setting'>
        <img src={setting} alt="设置" className='yuque-plugin__icon-setting' />
        <img src={feedback} alt="反馈" className='yuque-plugin__icon-feedback' />
      </div>
      <div className='yuque-plugin__menu'>
        {menu.map(item => {
          return item.visible ?
            (
              <div key={item.type} className='yuque-plugin__menu-item'>
                {item.title}
              </div>
            ) : null;
        })}
      </div>
    </div>
  );
}

export default Popup;
