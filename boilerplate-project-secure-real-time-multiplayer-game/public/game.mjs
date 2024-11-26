const socket = io();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let players = {};
let item = {};

socket.on('currentPlayers', (serverPlayers) => {
  players = serverPlayers;
  draw();
});

socket.on('newPlayer', (newPlayer) => {
  players[newPlayer.playerId] = newPlayer.position;
  draw();
});

socket.on('playerMoved', (playerData) => {
  players[playerData.playerId] = playerData.position;
  draw();
});

socket.on('itemLocation', (newItem) => {
  item = newItem;
  draw();
});

socket.on('itemCollected', (data) => {
  players[data.playerId].score = data.newScore;
  item = data.newItemLocation;
  draw();
});

socket.on('playerDisconnected', (playerId) => {
  delete players[playerId];
  draw();
});

document.addEventListener('keydown', (event) => {
  let movement = { direction: '', speed: 5 };
  if (event.key === 'ArrowUp') movement.direction = 'up';
  if (event.key === 'ArrowDown') movement.direction = 'down';
  if (event.key === 'ArrowLeft') movement.direction = 'left';
  if (event.key === 'ArrowRight') movement.direction = 'right';

  if (movement.direction) {
    socket.emit('playerMovement', movement);
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const playerId in players) {
    const player = players[playerId];
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, 20, 20);
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${player.score}`, player.x, player.y - 10);
  }

  if (item) {
    ctx.fillStyle = 'red';
    ctx.fillRect(item.x, item.y, 15, 15);
  }
}

export default draw;