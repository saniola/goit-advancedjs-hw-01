import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const saveCurrentTime = throttle((data) => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

const savedTime = localStorage.getItem(STORAGE_KEY);

if (savedTime) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Error setting current time:', error);
  });
}

player.on('timeupdate', saveCurrentTime);
