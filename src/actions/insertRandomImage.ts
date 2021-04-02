import { message } from 'antd';
import copyToClipboard from '@/helper/copyToClipboard';
import { getUnsplashAccessKey, getRandomPhoto } from '@/service';

/**
 * Insert an random image from Unsplash
 */
async function insertRandomImage() {
  const response = await getUnsplashAccessKey();
  if (!response) return message.error('获取 Unsplash Access Key 失败');

  const photo = await getRandomPhoto(response!.accessKey);
  if (!photo) return message.error('获取 Unsplash 随机图片失败');

  const markdownPhoto = `![${photo.alt_description} - Photo by ${photo.user.name} on Unsplash](https://source.unsplash.com/${photo.id}/800x600)`;
  const markdownLink = `[${markdownPhoto}](${photo.links.html})`;

  await copyToClipboard(markdownLink, '随机图片');
}

export default insertRandomImage;
