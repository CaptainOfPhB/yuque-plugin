import React from 'react';
import store from '@/store';
import { BookSerializer } from '@/interface';
import { message, Modal, Select } from 'antd';
import { getBooksBy, getTocOfBookBy } from '@/service';
import copyToClipboard from '@/helper/copyToClipboard';

let namespace = '';

async function onConfirm() {
  if (!namespace) return message.error('请选择一个知识库');

  const toc = await getTocOfBookBy(namespace);
  if (!toc) return message.error('获取知识库目录结构失败');

  const normalizedToc = toc
    .map(article => `[${article.title}](https://www.yuque.com/${namespace}/${article.url})<br/>`)
    .join('');

  await copyToClipboard(normalizedToc, '知识库大纲');
}

async function copyBookToc() {
  const user = await store.get<{ id: number }>('user', ['id']);
  if (!user) return;

  const books = await getBooksBy(user.id);
  if (!books) return message.error('获取知识库失败');

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
}

export default copyBookToc;
