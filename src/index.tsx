import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { renderRoutes } from 'react-router-config';
import { Switch, BrowserRouter } from 'react-router-dom';

import routes from '@/router';

function getPopupContainer(trigger: HTMLElement | null) {
  if (trigger) {
    return trigger.parentNode as HTMLElement;
  }
  return document.body;
}

function App() {
  return (
    <ConfigProvider locale={zh_CN} getPopupContainer={getPopupContainer}>
      <BrowserRouter>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
