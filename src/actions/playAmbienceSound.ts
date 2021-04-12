function playAmbienceSound() {
  const container = document.createElement('div');
  const button = document.createElement('div');
  container.classList.add('yuque-plugin__player-container');
  button.classList.add('yuque-plugin__player-button');
  button.classList.add('yuque-plugin__player-paused');
  container.append(button);
  document.body.append(container);

  const player = new Audio('http://music.163.com/song/media/outer/url?id=1824960995.mp3');
  player.preload = 'auto';
  player.loop = true;
  void player.play();

  button.addEventListener('click', function () {
    button.classList.toggle('yuque-plugin__player-paused');
    player.paused ? void player.play() : player.pause();
  });
}

export default playAmbienceSound;
