class Player {
  constructor({ x, y, score, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(direction, speed) {
    switch (direction) {
      case 'up':
        this.y -= speed;
        break;
      case 'down':
        this.y += speed;
        break;
      case 'left':
        this.x -= speed;
        break;
      case 'right':
        this.x += speed;
        break;
    }
  }

  collision(item) {
     return this.x < item.x + 15 &&
           this.x + 20 > item.x &&
           this.y < item.y + 15 &&
           this.y + 20 > item.y;
  }

  calculateRank(playersArray) {
     playersArray.sort((a, b) => b.score - a.score);
    return playersArray.findIndex(player => player.id === this.id) + 1;
  }
}

export default Player;
