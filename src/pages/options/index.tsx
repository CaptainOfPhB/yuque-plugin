import React from 'react';
import * as ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Options from './options';

function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <Options />
    </ConfigProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
