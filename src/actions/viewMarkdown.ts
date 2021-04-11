import { message } from 'antd';
import isDocPage from '@/helper/isDocPage';

/**
 * View markdown structure of Yuque article page
 */
async function viewMarkdown() {
  if (!isDocPage()) {
    return message.error('该功能只可在文档页面使用');
  }
  const [url] = window.location.href.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export default viewMarkdown;
