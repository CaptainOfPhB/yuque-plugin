import store from '@/store';

void (async function replaceFontFamily() {
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
