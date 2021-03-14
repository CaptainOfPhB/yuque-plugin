/**
 * Get url of the current tab with markdown format
 * @return {string}
 */
function getMarkdownUrlOfCurrentTab(): string {
  return `[${document.title}](${location.href})`;
}

export default getMarkdownUrlOfCurrentTab;
