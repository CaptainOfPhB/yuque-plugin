import React from 'react';
import * as ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Options from './options';

if (process.env.NODE_ENV === 'development') {
  require('antd/dist/antd.css');
}

function getPopupContainer(trigger: HTMLElement | null) {
  if (trigger) {
    return trigger.parentNode as HTMLElement;
  }
  return document.body;
}

function App() {
  return (
    <ConfigProvider locale={zh_CN} getPopupContainer={getPopupContainer}>
      <Options />
    </ConfigProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
