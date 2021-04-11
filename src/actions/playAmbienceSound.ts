import '@/player.less';

function playAmbienceSound() {
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('yuque-plugin__player-container');
  document.body.append(playerContainer);
}

export default playAmbienceSound;
