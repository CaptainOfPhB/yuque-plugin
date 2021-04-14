import store from '@/store';
import music from '@/config/music';

async function playAmbienceSound() {
  const config = await store.get<{ musicSrc: string }>('basicConfig', undefined, ['musicSrc']);
  const src = config?.musicSrc ? music.find(m => m.id === config.musicSrc)!.src : music[0].src;

  const container = document.createElement('div');
  const button = document.createElement('div');
  container.classList.add('yuque-plugin__player-container');
  button.classList.add('yuque-plugin__player-button');
  button.classList.add('yuque-plugin__player-paused');
  container.append(button);
  document.body.append(container);

  const player = new Audio(src);
  player.preload = 'auto';
  player.loop = true;
  await player.play();

  button.addEventListener('click', function () {
    button.classList.toggle('yuque-plugin__player-paused');
    player.paused ? void player.play() : player.pause();
  });
}

export default playAmbienceSound;
