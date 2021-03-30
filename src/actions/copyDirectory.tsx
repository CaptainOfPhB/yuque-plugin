import React from 'react';
import { message, Modal, Select } from 'antd';
import { getRepos, getTocUnderRepo } from '@/service';
import copyToClipboard from '@/helper/copyToClipboard';
import { BookSerializer, TocSerializer, UserSerializer } from '@/interface';

/**
 * Copy the TOC of book
 */
function copyDirectory() {
  chrome.storage.sync.get(async function (store) {
    const [hasErr, reposOrErr] = await getRepos<BookSerializer[]>((store.user as UserSerializer).id);
    if (hasErr) return message.error('获取知识库失败');
    let selectedNamespace = '';
    Modal.info({
      icon: null,
      okText: '复制',
      title: '请选择知识库',
      content: (
        <Select placeholder='请选择知识库' style={{ width: '100%' }} onChange={(v: string) => (selectedNamespace = v)}>
          {(reposOrErr as BookSerializer[]).map(repo => (
            <Select.Option key={repo.namespace} value={repo.namespace}>
              {repo.name}
            </Select.Option>
          ))}
        </Select>
      ),
      onOk: async () => {
        if (!selectedNamespace) return message.error('请选择一个知识库');
        const [hasErr, tocOrErr] = await getTocUnderRepo<TocSerializer[]>(selectedNamespace);
        if (hasErr) return message.error('获取知识库目录结构失败');
        const normalizedToc = (tocOrErr as TocSerializer[])
          .map(toc => `[${toc.title}](https://www.yuque.com/${selectedNamespace}/${toc.url})<br/>`)
          .join('');
        await copyToClipboard(normalizedToc, '目录结构');
      }
    });
  });
}

export default copyDirectory;
