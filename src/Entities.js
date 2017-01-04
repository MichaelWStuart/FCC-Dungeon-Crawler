import React, { Component } from 'react';
import chest from './Chest0.png';
import tile from './Tile.png';
import warrior from './Warrior.png';

class Entities extends Component {

  componentDidMount() {
    const canvas = this.refs.entities;
    this.ctx = canvas.getContext('2d');
    this.drawEntities();
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, 352, 352);
    this.drawEntities();
  }

  addEntity(dx,dy,x,y) {
    const img = new Image();
    let treasure, monster;
    if ((x === this.props.stairsUp[0]) && (y === this.props.stairsUp[1])) {
      img.src = tile;
      img.onload = () => this.ctx.drawImage(img, 80, 49, 15, 15, dx, dy, 32, 32);
    }
    if (this.props.dungeonLevel !== 10) {
      if ((x === this.props.stairsDown[0]) && (y === this.props.stairsDown[1])) {
        img.src = tile;
        img.onload = () => this.ctx.drawImage(img, 112, 48, 16, 16, dx, dy, 32, 32);
      }
    }
    treasure = this.props.treasure.find((item) => {
      return ((x === item.position[0]) && (y === item.position[1]));
    })
    if (treasure) {
      img.src = chest;
      if (treasure.type === 'potion') {
        img.onload = () => this.ctx.drawImage(img, 32, 32, 16, 16, dx, dy, 32, 32);
      } else {
        img.onload = () => this.ctx.drawImage(img, 16, 0, 16, 16, dx, dy, 32, 32);
      }
    }
    monster = this.props.monsters.find((item) => {
      return ((x === item.position[0]) && (y === item.position[1]));
    })
    if (monster) {
      img.src = monster.src;
      img.onload = () => this.ctx.drawImage(img, monster.x, monster.y, 16, 16, dx, dy, 32, 32);
      if (monster.isAdjacent(this.props.position)) {
        const monsterHealthBar = (32 * monster.health) / monster.maxHealth;
        const playerHealthBar = (32 * this.props.stats.health) / this.props.stats.maxHealth;
        this.ctx.strokeRect(160, 150, 32, 10);
        this.ctx.strokeRect(dx, dy -10, 32, 10);
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(160, 150, playerHealthBar, 10);
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(dx, dy - 10, monsterHealthBar, 10);
      }
    }
  }

  heading() {
    switch (this.props.heading) {
      case 'up':
        return 48;
      case 'down':
        return 0;
      case 'left':
        return 16;
      case 'right':
        return 32;
      default: break;
    }
  }

  drawEntities() {
    let dx, dy;
    for (let x = this.props.position[0] - 5; x <= this.props.position[0] + 5; x++) {
      for (let y = this.props.position[1] - 5; y <= this.props.position[1] + 5; y++) {
        dx = (x - (this.props.position[0] - 5)) * 32;
        dy = (y - (this.props.position[1] - 5)) * 32;
        this.addEntity(dx, dy, x, y);
      }
    }
    const img = new Image();
    img.src = warrior;
    img.onload = () => this.ctx.drawImage(img, 0, this.heading(), 16, 16, 160, 160, 32, 32);
  }

  render() {
    return(
      <div>
        <canvas id='entities' width='352' height='352' ref='entities'/>
      </div>
    )
  }
}

export default Entities;
