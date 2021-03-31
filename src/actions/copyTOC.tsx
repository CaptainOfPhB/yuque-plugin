import React from 'react';
import { message, Modal, Select } from 'antd';
import { getBooks, getTOC } from '@/service';
import copyToClipboard from '@/helper/copyToClipboard';
import { BookSerializer, TocSerializer, UserSerializer } from '@/interface';

/**
 * Copy the TOC of book
 */
function copyTOC() {
  chrome.storage.sync.get(async function (store) {
    const [hasErr, books] = await getBooks<BookSerializer[]>((store.user as UserSerializer).id);
    if (hasErr) return message.error('获取知识库失败');
    let namespace = '';
    Modal.info({
      icon: null,
      okText: '复制',
      title: '请选择知识库',
      content: (
        <Select placeholder='请选择知识库' style={{ width: '100%' }} onChange={(v: string) => (namespace = v)}>
          {(books as BookSerializer[]).map(repo => (
            <Select.Option key={repo.namespace} value={repo.namespace}>
              {repo.name}
            </Select.Option>
          ))}
        </Select>
      ),
      onOk: async () => {
        if (!namespace) return message.error('请选择一个知识库');
        const [hasErr, toc] = await getTOC<TocSerializer[]>(namespace);
        if (hasErr) return message.error('获取知识库目录结构失败');
        const normalizedToc = (toc as TocSerializer[])
          .map(article => `[${article.title}](https://www.yuque.com/${namespace}/${article.url})<br/>`)
          .join('');
        await copyToClipboard(normalizedToc, '目录结构');
      }
    });
  });
}

export default copyTOC;
