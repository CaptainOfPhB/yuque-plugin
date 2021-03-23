import React from 'react';

import './popup.less';

function Popup() {
  return (
    <div className='yuque-plugin__popup-container'>
      <div className='yuque-plugin__setting'>
        <div className='yuque-plugin__icon-wrapper'>
          <span>设置</span>
        </div>
        <div className='yuque-plugin__icon-wrapper'>
          <span>反馈</span>
        </div>
      </div>
    </div>
  );
}

export default Popup;
