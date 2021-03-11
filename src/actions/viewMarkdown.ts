function viewMarkdown(url: string) {
  const [_url] = url.split('/edit');
  window.open(_url.concat('/markdown?plain=true&linebreak=false&anchor=false'), '_blank');
}

export default viewMarkdown;
