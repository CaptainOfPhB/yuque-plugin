import store from '@/store';
import { message } from 'antd';
import underEditing from '@/helper/underEditing';
import copyToClipboard from '@/helper/copyToClipboard';

async function insertSummaryInfo() {
  if (!underEditing()) {
    return message.error('该功能只可在编辑文档时使用');
  }

  const editor = document.querySelector('.ne-engine')!;

  const wordsCount = (editor.textContent || '').replace(/\r\n|\r|\n|\s/g, '').length;
  if (!wordsCount) return message.error('文档没有内容，请先写一些文字吧');

  const config = await store.get<{ readingSpeed: number }>('basicConfig', ['readingSpeed']);
  if (!config) return message.error('请配置阅读速度后再使用');

  const time = Math.round(wordsCount / config.readingSpeed);
  const summary = `本文约 ${wordsCount} 字，阅读预计需要 ${time} 分钟`;

  await copyToClipboard(summary, '文档统计信息');
}

export default insertSummaryInfo;
