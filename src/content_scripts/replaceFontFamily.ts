import store from '@/store';
import isYuquePage from '@/helper/isYuquePage';

void (async function replaceFontFamily() {
  if (!isYuquePage()) return;
  const config = await store.get<{ fontFamily: string }>('basicConfig', undefined, ['fontFamily']);
  if (!config || !config.fontFamily) return;
  replace(config.fontFamily);
  setTimeout(() => replace(config.fontFamily), 1000);
})();

function replace(fontFamily: string) {
  document
    .querySelectorAll('*')
    .forEach((element: Element) => ((element as HTMLElement).style.fontFamily = fontFamily));
}
