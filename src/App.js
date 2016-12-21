import React, { Component } from 'react';
import Dungeon from './Dungeon';
import Gameboard from './Gameboard';
import Entities from './Entities';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let midpoint = Math.floor(window.innerWidth / 2);
    let monsterCount = 25; //can't use in constructor right now
    let mapSize = 100; //can't use in constructor right now
    let dungeon = new Dungeon(100, 100, 7, 15, 5, 25);
    let [position, monsterLocs, treasureChests] = this.initialAssignment(mapSize, dungeon.dungeon)
    this.updateMidpoint = this.updateMidpoint.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.determineDirection = this.determineDirection.bind(this);
    this.move = this.move.bind(this);
    this.animateMonsters = this.animateMonsters.bind(this);
    this.concealPerimeter = this.concealPerimeter.bind(this);
    this.state= {dungeon: dungeon.dungeon, position, monsterLocs, treasureChests, previousTile: 'entry',
                 monsterCount, midpoint, mapSize, orientation: 'left',
                 equipment: {
                   weapon: {name: 'Fist', damage: [1,3]},
                   armor: {name: 'none', defense: 0}
                 }
                }
  }



  initialAssignment(mapSize, dungeon) {
    let position;
    let monsters = [];
    let treasures = [];
    for (let x = 0; x < mapSize; x++) {
      for(let y = 0; y < mapSize; y++) {
        if (dungeon[[x,y]] === 'entry') {
          position = [x + 1,y];
        } else if (dungeon[[x,y]] === 'monster') {
          monsters.push([x,y])
        } else if (dungeon[[x,y]] === 'treasure') {
          treasures.push([x,y]);
        }
      }
    }
    return [position, monsters, treasures];
  }

  randomMonsterMove(oldPosition) {
    let newPosition;
    let randomFloat = Math.random();
    if (randomFloat < .25) {
      newPosition = [oldPosition[0], oldPosition[1] - 1];
    } else if (randomFloat < .5) {
      newPosition = [oldPosition[0], oldPosition[1] + 1];
    } else if (randomFloat < .75) {
      newPosition = [oldPosition[0] - 1, oldPosition[1]];
    } else {
      newPosition = [oldPosition[0] + 1, oldPosition[1]];
    }
    if (this.state.dungeon[newPosition] === 'floor') {
      return newPosition;
    } else {
      return oldPosition;
    }
  }

  swarmingMonsterMove(oldPosition, monsterLocs) {
    let newPosition;
    let pX = this.state.position[0];
    let pY = this.state.position[1];
    let mX = oldPosition[0];
    let mY = oldPosition[1];
    if ((pX - mX) > 0) {
      newPosition = [oldPosition[0] + 1, oldPosition[1]];
    } else if ((pX - mX) < 0) {
      newPosition = [oldPosition[0] - 1, oldPosition[1]];
    } else if ((pY - mY) > 0) {
      newPosition = [oldPosition[0], oldPosition[1] + 1];
    } else if ((pY - mY) < 0) {
      newPosition = [oldPosition[0], oldPosition[1] - 1];
    }
    if ((this.state.dungeon[newPosition] === 'floor') && (monsterLocs.indexOf(newPosition) === -1)) {
      return newPosition;
    } else {
      return oldPosition;
    }
  }

  animateMonsters() {
    let dungeon = Object.assign({}, this.state.dungeon);
    let monsterLocs = [...this.state.monsterLocs];
    let newPosition;
    this.state.monsterLocs.forEach((oldPosition, i) => {
      if ((Math.abs(oldPosition[0] - this.state.position[0]) > 4) || (Math.abs(oldPosition[1] - this.state.position[1]) > 4)) {
        newPosition = this.randomMonsterMove(oldPosition);
      } else if ((Math.abs(oldPosition[0] - this.state.position[0]) > 1) || (Math.abs(oldPosition[1] - this.state.position[1]) > 1)) {
        newPosition = this.swarmingMonsterMove(oldPosition, monsterLocs);
        monsterLocs.splice(i,1,newPosition);
      } else {
        newPosition = oldPosition;
      }
      dungeon[oldPosition] = 'floor';
      dungeon[newPosition] = 'monster';
    })
    return [dungeon, monsterLocs];
  }

  handleOverlayClick(e) {
    const newPosition = this.move(this.determineDirection(e)).slice(0,2);
    const orientation = this.determineDirection(e)[2];
    const entity = this.state.dungeon[newPosition]
    const [dungeon, monsterLocs] = this.animateMonsters();
    if (entity === 'floor') {
      dungeon[this.state.position] = 'floor'
      dungeon[newPosition] = 'hero';
      this.setState({dungeon, monsterLocs, position: newPosition, orientation});
    } else if (entity === 'wall') {
      this.setState({dungeon, monsterLocs, position: this.state.position, orientation});
    } else if (entity === 'treasure') {
      console.log('loot me')
    } else if (entity === 'monster') {
      console.log('slay me')
    }
  }

  determineDirection(e) {
    const x = e.clientX - this.state.midpoint;
    const y = e.clientY - 196;
    if ((y > 0) && ((y - Math.abs(x)) > 0)) {
      return [0, 1, 'down'];
    } else if ((y < 0) && ((Math.abs(y) - Math.abs(x)) > 0)) {
      return [0, -1, 'up'];
    } else if ((x > 0) && ((x - Math.abs(y)) > 0)) {
      return [1, 0, 'right'];
    } else {
      return [-1, 0, 'left'];
    }
  }

  move(direction) {
    const newPosition = [];
    newPosition.push(this.state.position[0] + direction[0]);
    newPosition.push(this.state.position[1] + direction[1]);
    return newPosition;
  }

  concealPerimeter() {
    const canvas = this.refs.canvasOverlay;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(176,176,176,100,100,0);
    gradient.addColorStop(0,'black');
    gradient.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,352,352);
  }

  updateMidpoint() {this.setState({midpoint: Math.floor(window.innerWidth / 2)});}

  componentWillMount() {this.updateMidpoint();}

  componentDidMount() {
    window.addEventListener("resize", this.updateMidpoint);
    this.concealPerimeter();
  }

  componentWillUnmount() {window.removeEventListener("resize", this.updateMidpoint);}

  render() {
    return (
      <div>
        <Gameboard
          dungeon={this.state.dungeon}
          position={this.state.position}/>
        <Entities
          dungeon={this.state.dungeon}
          position={this.state.position}/>
        <canvas id='canvas-overlay' width='352' height='352' ref='canvasOverlay'/>
        <div id='overlay' onClick={this.handleOverlayClick}/>
      </div>
    )
  }
}

export default App;
