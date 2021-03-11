import Menu from '@/config/menu';
import { Type } from '@/interface';

// remove menu first if created
// reference: https://stackoverflow.com/a/37000388
chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  id: 'yuque-plugin',
  title: 'Yuque plugin - 语雀插件'
});

for (const item of Menu) {
  chrome.contextMenus.create({
    id: item.type,
    title: item.title,
    parentId: 'yuque-plugin'
  });
}

chrome.contextMenus.create({
  id: 'separator',
  type: 'separator',
  parentId: 'yuque-plugin'
});

chrome.contextMenus.create({
  id: Type.Setting,
  title: '设置',
  parentId: 'yuque-plugin'
});

chrome.contextMenus.onClicked.addListener(function onClickContentMenus(info, tab) {
  console.log(info, tab);
  console.log(window.location);
});
