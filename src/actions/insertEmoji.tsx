import React from 'react';
import { message, Modal, Radio, Tabs } from 'antd';
import { YUQUE, YELLOW_FACE } from '@/config/emoticons';

enum Tab {
  Yuque = 'Yuque',
  YellowFace = 'YellowFace'
}

enum Size {
  Large = 64,
  Medium = 32,
  Small = 24
}

let size = Size.Large;
let selection: Selection | null = null;

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
  span.innerHTML = `<img src=${emojiUrl} alt="emoji" width="${size}" height="${size}" />`;
  return span;
}

function onAddEmoji(url: string) {
  selection?.collapseToStart();
  const range = selection?.getRangeAt(0);

  const emoji = createEmoji(url);
  const focusNode =
    !selection!.focusOffset && selection?.focusNode?.nodeType === 1
      ? selection!.focusNode!.previousSibling!
      : selection!.focusNode!;
  const parentElement = focusNode.parentElement!;

  if (focusNode.nodeType === 3) {
    const prefixSpan = document.createElement('span');
    prefixSpan.innerHTML = parentElement.textContent!.slice(0, selection!.focusOffset);
    const suffixSpan = document.createElement('span');
    suffixSpan.innerHTML = parentElement.textContent!.slice(selection!.focusOffset);
    parentElement.innerHTML = '';
    parentElement.appendChild(prefixSpan);
    parentElement.appendChild(emoji);
    parentElement.appendChild(suffixSpan);
    range?.setStartBefore(emoji.nextSibling!);
  }

  if (focusNode.nodeType === 1) {
    let target = focusNode.childNodes[0];
    const length = focusNode.childNodes.length;

    if (!target) {
      focusNode.appendChild(emoji);
      range?.setStartAfter(emoji);
      range?.collapse(true);
      return Modal.destroyAll();
    }

    if (target.nodeName === 'BR') {
      focusNode.replaceChild(emoji, target);
      range?.setStartAfter(emoji);
      range?.collapse(true);
      return Modal.destroyAll();
    }

    if (target.nodeName === 'IMG') {
      parentElement.insertBefore(emoji, target.nextSibling);
      range?.setStartAfter(emoji);
      range?.collapse(true);
      return Modal.destroyAll();
    }

    if (target.nodeName === '#text') {
      const prefixSpan = document.createElement('span');
      prefixSpan.innerHTML = target.textContent!.slice();
      focusNode.replaceChild(prefixSpan, target);
      focusNode.appendChild(emoji);
      range?.setStartAfter(emoji);
      range?.collapse(true);
      return Modal.destroyAll();
    }

    if (target.nodeName === 'SPAN' && length === 1) {
      focusNode.appendChild(emoji);
      range?.setStartAfter(emoji);
      range?.collapse(true);
      return Modal.destroyAll();
    }

    while (target.childNodes[0] && target.childNodes[0].nodeName !== 'BR') {
      target = target.childNodes[0];
    }
    target.replaceChild(emoji, target.childNodes[0]);
    range?.setStartAfter(emoji);
    range?.collapse(true);

    Modal.destroyAll();
  }
}

async function insertEmoji() {
  const editor = document.querySelector('.lake-content-editor-core');
  if (!editor || !editor.contains(document.getSelection()!.focusNode)) {
    return message.error('该功能只可在编辑文档或进行评论时使用');
  }

  selection = document.getSelection();

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
      <Tabs
        defaultValue={Tab.Yuque}
        tabBarExtraContent={
          <Radio.Group defaultValue={Size.Large} onChange={e => (size = e.target.value)}>
            <Radio value={Size.Large}>大</Radio>
            <Radio value={Size.Medium}>中</Radio>
            <Radio value={Size.Small}>小</Radio>
          </Radio.Group>
        }
      >
        <Tabs.TabPane tab={<img src={YUQUE[0]} alt='语雀' width={24} height={24} />} key={Tab.Yuque}>
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
        <Tabs.TabPane tab={<img src={YELLOW_FACE[0]} alt='大黄脸' width={24} height={24} />} key={Tab.YellowFace}>
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
                onClick={onAddEmoji.bind(null, src)}
              />
            ))}
          </Wrapper>
        </Tabs.TabPane>
      </Tabs>
    )
  });
}

export default insertEmoji;
