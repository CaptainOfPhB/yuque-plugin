import { message } from 'antd';
import { getDoc } from '@/service';
// import copyToClipboard from '@/helper/copyToClipboard';
// import { TocSerializer } from '@/interface';

/**
 * Copy the TOC of book
 */

function copyDocToc() {
  chrome.storage.sync.get(async function () {
    const [hasErr, toc] = await getDoc('captainofphb/temp', 'igbyv7');
    if (hasErr) return message.error('获取知识库目录结构失败');
    const parser = new DOMParser();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const document1 = parser.parseFromString(toc.body_html, 'text/html');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const document2 = parser.parseFromString(toc.body_lake, 'text/html');
    console.log(document1);
    console.log(document2);
  });
}

export default copyDocToc;
