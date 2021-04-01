import React from 'react';
import { message, Modal, Select } from 'antd';
import { getBooks, getTOC } from '@/service';
import copyToClipboard from '@/helper/copyToClipboard';
import { BookSerializer, TocSerializer, UserSerializer } from '@/interface';

let namespace = '';

async function onConfirm() {
  if (!namespace) return message.error('请选择一个知识库');

  const [hasErr, toc] = await getTOC<TocSerializer[]>(namespace);
  if (hasErr) return message.error('获取知识库目录结构失败');

  const normalizedToc = (toc as TocSerializer[])
    .map(article => `[${article.title}](https://www.yuque.com/${namespace}/${article.url})<br/>`)
    .join('');

  await copyToClipboard(normalizedToc, '知识库大纲');
}

function copyBookToc() {
  chrome.storage.sync.get(async function (store) {
    const [hasErr, books] = await getBooks<BookSerializer[]>((store.user as UserSerializer).id);
    if (hasErr) return message.error('获取知识库失败');

    Modal.confirm({
      icon: null,
      okText: '复制',
      onOk: onConfirm,
      cancelText: '取消',
      title: '请选择知识库',
      content: (
        <Select
          placeholder='请选择知识库'
          style={{ width: '100%', marginTop: 10 }}
          onChange={(v: string) => (namespace = v)}
        >
          {(books as BookSerializer[]).map(book => (
            <Select.Option key={book.namespace} value={book.namespace}>
              {book.name}
              <span style={{ color: '#ccc' }}>{book.description ? ` - ${book.description}` : null}</span>
            </Select.Option>
          ))}
        </Select>
      )
    });
  });
}

export default copyBookToc;
