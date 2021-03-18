import isArticlePage from '@/helper/isArticlePage';

/**
 * View markdown structure of Yuque article page
 */
function viewHTML() {
  if (!isArticlePage()) {
    return new Noty({
      type: 'error',
      text: '该功能只可在文档页面使用！'
    }).show();
  }
  const [url] = window.location.href.split('/edit');
  window.open(url.concat('/html'), '_blank');
}

export default viewHTML;
