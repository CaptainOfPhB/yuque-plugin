import React from 'react';
import { ConfigProvider } from 'antd';
import * as ReactDOM from 'react-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import './popup.less';
import Popup from './popup';

function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <Popup />
    </ConfigProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
