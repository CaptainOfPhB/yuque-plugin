import React from 'react';
import { message, Modal, Tabs } from 'antd';
import underEditing from '@/helper/underEditing';
import isArticlePage from '@/helper/isArticlePage';
import { YUQUE, YELLOW_FACE } from '@/config/emoticons';

function Wrapper(props: React.PropsWithChildren<unknown>) {
  return (
    <div
      style={{ height: '100%', overflow: 'scroll', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}
    >
      {props.children}
    </div>
  );
}

function createEmoji(emojiUrl: string) {
  const span = document.createElement('span');
  span.setAttribute('data-lake-card', 'emoji');
  span.setAttribute('data-card-type', 'inline');
  span.setAttribute('data-card-value', encodeURIComponent(`data:${JSON.stringify({ src: emojiUrl, package: 'que' })}`));
  span.innerHTML = `
    <span data-card-element="body">
      <span data-card-element="left">&#8203;</span>
      <span data-card-element="center" contenteditable="false">
        <img class="lake-emoji lake-emoji-que" src=${emojiUrl} alt="emoji"/>
      </span>
      <span data-card-element="right">&#8203;</span>
    </span>
  `;
  return span;
}

function onAddEmoji(url: string) {
  const span = createEmoji(url);
  console.log(url);
  console.log(span);
}

async function insertEmoji() {
  if (!isArticlePage()) {
    return message.error('该功能只可在文档页面使用');
  }
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用');
  }

  Modal.confirm({
    width: 544,
    icon: null,
    cancelText: '关闭',
    okText: '使用 Emoji',
    bodyStyle: { marginTop: -20, height: 350 },
    maskStyle: { backgroundColor: 'transparent' },
    cancelButtonProps: { onClick: () => Modal.destroyAll() },
    okButtonProps: { onClick: () => window.open('https://getemoji.com', '_blank') },
    content: (
      <Tabs>
        <Tabs.TabPane tab={<img src={YUQUE[0]} alt='语雀' width={24} height={22} />}>
          <Wrapper>
            {YUQUE.map(src => (
              <img
                key={src}
                src={src}
                alt='emoji'
                width={64}
                height={64}
                style={{ margin: 2, cursor: 'pointer' }}
                onClick={onAddEmoji.bind(null, src)}
              />
            ))}
          </Wrapper>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<img src={YELLOW_FACE[0]} alt='大黄脸' width={24} height={22} />}>
          <Wrapper>
            {YELLOW_FACE.map(src => (
              <img
                key={src}
                src={src}
                alt='emoji'
                width={24}
                height={24}
                crossOrigin='anonymous'
                style={{ margin: 4, cursor: 'pointer' }}
              />
            ))}
          </Wrapper>
        </Tabs.TabPane>
      </Tabs>
    )
  });
}

export default insertEmoji;
