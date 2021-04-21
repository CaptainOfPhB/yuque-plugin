import React, { useCallback } from 'react';
import { RequestOpenGitHubPage } from '@/interface';

const cls = (s: string) => `yuque-plugin__${s}`;

function Popup() {
  const onClick = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openGitHubPage' } as RequestOpenGitHubPage);
  }, []);

  return (
    <div className={cls('popup-container')}>
      <div className={cls('title-container')}>
        <img src='../../images/yuque_128.png' alt='logo' />
        <span>Yuque plugin</span>
      </div>
      <div className={cls('slug')}>Make yuque more powerful.</div>
      <div className={cls('copyright')}>
        Copyright&nbsp;&copy;&nbsp;{new Date().getFullYear()}&nbsp;
        <span className={cls('user')} onClick={onClick}>
          CaptainOfPhB
        </span>
      </div>
    </div>
  );
}

export default Popup;
