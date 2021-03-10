import React from 'react';
import * as ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { renderRoutes } from 'react-router-config';
import { Switch, HashRouter } from 'react-router-dom';

import routes from '@/router';

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
      <HashRouter>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
