/**
 * True if on the TOC page of book
 * @return {boolean}
 */
function isDirectoryPage() {
  const matched = window.location.href.match(/\/toc$/);
  return !!matched && !!document.querySelector('.ant-tree-list-holder-inner');
}

export default isDirectoryPage;
