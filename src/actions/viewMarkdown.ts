import isArticlePage from '@/helper/isArticlePage';

/**
 * View markdown structure of Yuque article page
 */
function viewMarkdown() {
  if (!isArticlePage()) {
    return new Noty({
      type: 'error',
      text: '该功能只可在文档页面使用！'
    }).show();
  }
  const [url] = window.location.href.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export default viewMarkdown;
