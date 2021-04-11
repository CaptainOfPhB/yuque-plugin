import { message } from 'antd';
import isDocPage from '@/helper/isDocPage';

/**
 * View markdown structure of Yuque article page
 */
async function viewHTML() {
  if (!isDocPage()) {
    return message.error('该功能只可在文档页面使用');
  }
  const [url] = window.location.href.split('/edit');
  window.open(url.concat('/html'), '_blank');
}

export default viewHTML;
