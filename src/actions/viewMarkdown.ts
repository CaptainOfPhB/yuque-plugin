/**
 * View markdown structure of yuque article page
 */
function viewMarkdown() {
  const [url] = window.location.href.split('/edit');
  window.open(url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export default viewMarkdown;
