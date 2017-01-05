import React, { Component } from 'react';
import Dungeon from './Dungeon';
import FogOfWar from './FogOfWar'
import Entities from './Entities';
import Gameboard from './Gameboard';
import Treasure from './Treasure';
import Monsters from './Monsters';
import Armor from './Armor';
import Weapon from './Weapon';
import Level from './Level';
import _ from 'lodash';

class Game extends Component {
  constructor(props) {
    super(props);
    this.initialState = this.initialState.bind(this);
    this.goDownStairs = this.goDownStairs.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.move = this.move.bind(this);
    this.animateMonsters = this.animateMonsters.bind(this);
    this.attack = this.attack.bind(this);
    this.monsters = Monsters();
    this.state = {dungeonParams: {dungeonLevel: 1, mapSize: 100, iterations: 100, roomSize: 6, rooms: 15}};
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleOverlayClick);
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState(this.initialState());
    }, 1);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.dungeon && nextState.dungeon) {
      this.props.setLoading(false);
    }
  }

  conponentWillUnmount() {
    document.removeEventListener('keydown', this.handleOverlayClick);
  }

//-------------------------------------------------------SETUP--------------------------------------------------------//

  initialState() {
    return Object.assign({
      heading: 'right',
      equipment: {
        weapon: {
          name: 'Bent Sword',
          damage: [1,2]
        },
        armor: {
          name: 'Rusty Armor',
          defense: 1
        }
      },
      stats: {
        level: 1,
        exp: 0,
        maxHealth: this.props.difficulty === 'easy' ? 50 : this.props.difficulty === 'normal' ? 40 : 30,
        health: this.props.difficulty === 'easy' ? 50 : this.props.difficulty === 'normal' ? 40 : 30,
        power: 1,
        defense: 0
      }
    }, this.spawnEntities())
  }

  goDownStairs() {
    this.props.setLoading(true, () => {
      window.setTimeout(() => {
        const dungeonParams = Object.assign(this.state.dungeonParams, {
            dungeonLevel: this.state.dungeonParams.dungeonLevel + 1,
            mapSize: 98 + ((this.state.dungeonParams.dungeonLevel + 1) * 2),
            rooms: 13 + (this.state.dungeonParams.dungeonLevel + 1)
        });
        this.setState({dungeonParams, heading: 'right', dungeon: null}, () => {
          this.setState(this.spawnEntities());
        });
      }, 1);
    });
  }

  spawnEntities() {
    const {dungeon} = new Dungeon(this.state.dungeonParams);
    let centerTiles, roomTiles, treasure, position, stairsUp, stairsDown, monsters;
    [centerTiles, roomTiles] = this.scanDungeon(dungeon);
    [treasure, centerTiles] = this.spawnTreasure(centerTiles);
    [roomTiles, position, stairsDown, stairsUp] = this.spawnStairs(centerTiles, roomTiles);
    monsters = this.spawnMonsters(roomTiles);
    if ( this.state.dungeonParams.dungeonLevel === 10) {
      const goddessConstructor = this.monsters[10][0];
      const goddess = new goddessConstructor();
      goddess.position = stairsDown;
      monsters.push(goddess);
    }
    return { dungeon, treasure, monsters, stairsDown, stairsUp, position };
  }

  scanDungeon(dungeon) {
    const centerTiles = [];
    const roomTiles = [];
    for (let x = 0; x < this.state.dungeonParams.mapSize; x++) {
      for (let y = 0; y < this.state.dungeonParams.mapSize; y++) {
        if (dungeon[[x,y]] === 'center') {
          centerTiles.push([x,y]);
          dungeon[[x,y]] = 'floor';
        } else if (dungeon[[x,y]] === 'floor') {
          roomTiles.push([x,y]);
        }
      }
    }
    return [centerTiles, roomTiles]
  }

  spawnTreasure(centerTiles) {
    const diffMod = this.props.difficulty === 'easy' ? 6 : this.props.difficulty === 'normal' ? 3 : 1;
    const treasureCount = this.state.dungeonParams.dungeonLevel  + diffMod ;
    const treasures = [];
    const itemNames = [];
    const levelTreasures = Treasure[this.state.dungeonParams.dungeonLevel - 1];

    Object.keys(levelTreasures).forEach((treasure) => {
      for(let i = 0; i < levelTreasures[treasure].popularity; i++) {
        itemNames.push(treasure);
      }
    });

    while (treasures.length < treasureCount) {
      let sample = _.sample(centerTiles);
      centerTiles = centerTiles.filter((tile) => {
        return !((tile[0] === sample[0]) && (tile[1] === sample[1]));
      })
      let itemName = _.sample(itemNames);
      let item = _.cloneDeep(levelTreasures[itemName]);
      item.position = [sample[0],sample[1]];
      treasures.push(item);
    }
    return [treasures, centerTiles];
  }

  spawnStairs(centerTiles, roomTiles) {
    let stairsDown = _.sample(centerTiles);
    centerTiles = centerTiles.filter((tile) => {
      return !((tile[0] === stairsDown[0]) && (tile[1] === stairsDown[1]));
    })
    let stairsUp = _.sample(centerTiles);
    centerTiles = centerTiles.filter((tile) => {
      return !((tile[0] === stairsUp[0]) && (tile[1] === stairsUp[1]));
    })
    let playerPosition = [stairsUp[0] + 1, stairsUp[1]];
    roomTiles = roomTiles.filter((tile) => {
      return !((tile[0] === playerPosition[0]) && (tile[1] === playerPosition[1]));
    })
    return [roomTiles, playerPosition, stairsDown, stairsUp];
  }

  spawnMonsters(roomTiles) {
    const level = this.state.dungeonParams.dungeonLevel - 1;
    const monsterCount = (level * 2) + 20;
    const monsters = [];
    const levelMonsters = this.monsters[level];

    while (monsters.length < monsterCount) {
      //TODO: grab random room tiles until you get one that's not already used by another monster.
      const randomRoomTile = _.sample(roomTiles);
      const randomMonster = _.sample(levelMonsters);
      const monster = new randomMonster();
      monster.position = [randomRoomTile[0],randomRoomTile[1]];
      monsters.push(monster);
    }
    return monsters;
  }


//---------------------------------------------------CLICK ROUTER-----------------------------------------------------//


  handleOverlayClick(e) {
    if ((e.key === 'w') || (e.key === 'a') || (e.key === 's') || (e.key === 'd') || (e.type === 'click')) {
      let exp;
      let treasure = this.state.treasure;
      let equipment = this.state.equipment;
      let stats = this.state.stats;
      let [newPosition, heading] = this.move(e);
      let monsters = this.animateMonsters(newPosition);
      let [foundTreasure, foundMonster, foundStairsDown] = this.findEntities(newPosition);
      const pos = this.state.dungeon[newPosition];
      if ((pos === 'floor') || (pos === 'hall') || (pos === 'inner') || (pos === 'entrance')) {
        if (foundTreasure) {
          [treasure, equipment, stats] = this.loot(treasure, foundTreasure, equipment, stats);
          stats = this.defend(this.state.monsters, this.state.position, stats);
          newPosition = this.state.position;
        } else if (foundMonster) {
          [monsters, treasure, exp] = this.attack(monsters, foundMonster, treasure);
          stats = this.levelUp(exp, stats);
          stats = this.defend(this.state.monsters, this.state.position, stats);
          newPosition = this.state.position;
        } else if (foundStairsDown) {
          if (this.state.dungeonParams.dungeonLevel !== 10) {
            this.goDownStairs();
          }
        }
        this.setState({position: newPosition, heading, stats, monsters, treasure, equipment});
      } else if (this.state.dungeon[newPosition] === 'wall') {
        this.setState({heading});
      }
    }
  }

  findEntities(position) {
    let treasure = this.state.treasure.find((entity) => {
      return ((position[0] === entity.position[0]) && (position[1] === entity.position[1]));
    })
    let monster = this.state.monsters.find((entity) => {
      return ((position[0] === entity.position[0]) && (position[1] === entity.position[1]));
    })
    let down = ((position[0] === this.state.stairsDown[0]) && (position[1] === this.state.stairsDown[1])) && position;
    return [treasure, monster, down];
  }


//---------------------------------------------------PLAYER MOVES-----------------------------------------------------//


  move(e) {
    const x = e.clientX - this.props.midpoint;
    const y = e.clientY - 196;
    const newPosition = [];
    let direction;
    if (((y > 0) && ((y - Math.abs(x)) > 0)) || e.key === 's') {
      direction = [0, 1, 'down'];
    } else if (((y < 0) && ((Math.abs(y) - Math.abs(x)) > 0)) || e.key === 'w') {
      direction = [0, -1, 'up'];
    } else if (((x > 0) && ((x - Math.abs(y)) > 0)) || e.key === 'd') {
      direction = [1, 0, 'right'];
    } else if (((x < 0) && ((Math.abs(x) - Math.abs(y)) > 0)) || e.key === 'a'){
      direction = [-1, 0, 'left'];
    }
    newPosition.push(this.state.position[0] + direction[0]);
    newPosition.push(this.state.position[1] + direction[1]);
    return [newPosition, direction[2]];
  }


//--------------------------------------------------MONSTER MOVES-----------------------------------------------------//


  animateMonsters(playerPosition) {
    let monsters = this.state.monsters;
    monsters.forEach((monster) => {
      let oldP = monster.position;
      if ((Math.abs(oldP[0] - this.state.position[0]) > 5) || (Math.abs(oldP[1] - this.state.position[1]) > 5)) {
        this.randomMonsterMove(playerPosition, monsters, monster);
      } else if ((Math.abs(oldP[0] - this.state.position[0]) > 1) || (Math.abs(oldP[1] - this.state.position[1]) > 1)) {
        this.swarmingMonsterMove(playerPosition, monsters, monster);
      } else if ((Math.abs(oldP[0] - this.state.position[0]) === 1) && (Math.abs(oldP[1] - this.state.position[1]) === 1)) {
        this.randomMonsterMove(playerPosition, monsters, monster);
      }
    })
    return monsters;
  }

  randomMonsterMove(playerPosition, monsters, monster) {
    let newPosition;
    let oldPosition = monster.position;
    let random = Math.random();
    if (random < .25) {
      newPosition = [oldPosition[0], oldPosition[1] - 1];
    } else if (random < .5) {
      newPosition = [oldPosition[0], oldPosition[1] + 1];
    } else if (random < .75) {
      newPosition = [oldPosition[0] - 1, oldPosition[1]];
    } else {
      newPosition = [oldPosition[0] + 1, oldPosition[1]];
    }
    if (!this.monsterCollision(playerPosition, newPosition, monsters)) {
      monster.position = newPosition;
    }
  }

  swarmingMonsterMove(playerPosition, monsters, monster) {
    let newPosition;
    const [pX, pY] = playerPosition;
    const [mX, mY] = monster.position;
    if (((pX - mX) > 0) && ((pY - mY)) > 0) {
      newPosition = Math.random() > .5 ? [mX + 1, mY] : [mX, mY + 1];
    } else if (((pX - mX) < 0) && ((pY - mY) > 0)) {
      newPosition = Math.random() > .5 ? [mX - 1, mY] : [mX, mY + 1];
    } else if (((pX - mX) > 0) && ((pY - mY) < 0)) {
      newPosition = Math.random() > .5 ? [mX + 1, mY] : [mX, mY - 1];
    } else if (((pX - mX) < 0) && ((pY - mY) < 0)) {
      newPosition = Math.random() > .5 ? [mX - 1, mY] : [mX, mY - 1];
    } else if (((pX - mX) < 0) && ((pY - mY) === 0)) {
      newPosition = [mX - 1, mY];
    } else if (((pX - mX) > 0) && ((pY - mY) === 0)) {
      newPosition = [mX + 1, mY];
    } else if (((pX - mX) === 0) && ((pY - mY) < 0)) {
      newPosition = [mX, mY - 1];
    } else if (((pX - mX) === 0) && ((pY - mY) > 0)) {
      newPosition = [mX, mY + 1];
    }
    if (!this.monsterCollision(playerPosition, newPosition, monsters)) {
      monster.position = newPosition;
    }
  }

  monsterCollision(playerP, monsterP, monsters) {
    let collision;
    const pos = this.state.dungeon[monsterP];
    if ((pos !== 'floor') && (pos !== 'hall') && (pos !== 'inner') && (pos !== 'entrance')) return true;
    if ((playerP[0] === monsterP[0]) && (playerP[1] === monsterP[1])) return true;
    collision = !!monsters.find((monster) => {
      return ((monster.position[0] === monsterP[0]) && (monster.position[1] === monsterP[1]));
    })
    if (!collision) {
      collision = !!this.state.treasure.find((treasure) => {
        return ((treasure.position[0] === monsterP[0]) && (treasure.position[1] === monsterP[1]));
      })
    }
    return collision;
  }


//-----------------------------------------------------COMBAT---------------------------------------------------------//


  attack(monsters, target, treasure) {
    let exp = this.state.stats.exp;
    let position = target.position;
    const damage = this.state.equipment.weapon.damage;
    const attackRoll = this.state.stats.power + (damage[0] + Math.ceil(Math.random() * (damage[1] - damage[0])));
    target.defend(attackRoll);
    if (target.health < 1) {
      if (target.maxHealth === 777) {
        this.props.setVictory(true);
      }
      monsters = monsters.filter((monster) => {
        return !((monster.position[0] === target.position[0]) && (monster.position[1] === target.position[1]));
      })
      const loot = target.dropLoot();
      if (loot) {
        let item = _.cloneDeep(loot);
        item.position = position;
        treasure.push(item);
      }
      exp += target.exp;
    }
    return [monsters, treasure, exp];
  }

  defend(monsters, position, stats) {
    const defense = this.state.stats.defense + this.state.equipment.armor.defense;
    monsters.forEach((monster) => {
      if (monster.isAdjacent(position)) {
        stats.health -= monster.attack(defense);
        if (stats.health < 1) {
          document.removeEventListener('keydown', this.handleOverlayClick);
          this.props.setGameOver(true);
        }
      }
    })
    return stats;
  }

  levelUp(exp, stats) {
    const diffMod = this.props.difficulty === 'easy' ? 2 : this.props.difficulty === 'normal' ? 2.25 : 2.5;
    let nextLevel = 5;
    for (let i = 0; i < this.state.stats.level; i++) {
      nextLevel *= 2.25 //using diffmod variable would make it impossible on hard setting
    }
    nextLevel = Math.ceil(nextLevel);
    stats.exp = exp;
    if (stats.exp >= nextLevel) {
      stats.level += 1
      const healthIncrease = Math.ceil(Math.random() * (10 + (stats.level * 3 * (3 - diffMod))));
      stats.maxHealth += healthIncrease;
      stats.health += healthIncrease;
      stats.power += stats.level > 3 ? Math.ceil(Math.random() * ((stats.level / diffMod) * (3 - diffMod))) : 1;
      stats.defense += stats.level > 3 ? Math.ceil(Math.random() * ((stats.level / diffMod) * (3 - diffMod))) : 1;
    }
    return stats;
  }

  loot(treasure, foundTreasure, equipment, stats) {
    if (foundTreasure.type === 'potion') {
      stats.health += foundTreasure.healing
      if (stats.health > stats.maxHealth) {
        stats.health = stats.maxHealth;
      }
    } else if (foundTreasure.type === 'weapon'){
      let foundWeaponDamage = foundTreasure.damage[0] + foundTreasure.damage[1];
      let currentWeaponDamage = this.state.equipment.weapon.damage[0] + this.state.equipment.weapon.damage[1];
      if (foundWeaponDamage > currentWeaponDamage) {
        equipment.weapon = foundTreasure;
      }
    } else {
      if (foundTreasure.defense > this.state.equipment.armor.defense) {
        equipment.armor = foundTreasure;
      }
    }
    treasure = treasure.filter((item) => {
      return !((item.position[0] === foundTreasure.position[0]) && (item.position[1] === foundTreasure.position[1]));
    })
    return [treasure, equipment, stats];
  }

  render() {
    return this.props.loading ? null : (
      <div id='container'>
        <Gameboard
          dungeon={this.state.dungeon}
          position={this.state.position}
          dungeonLevel={this.state.dungeonParams.dungeonLevel}/>
        <Entities
          monsters={this.state.monsters}
          treasure={this.state.treasure}
          stairsDown={this.state.stairsDown}
          stairsUp={this.state.stairsUp}
          stats={this.state.stats}
          position={this.state.position}
          heading={this.state.heading}
          dungeonLevel={this.state.dungeonParams.dungeonLevel}/>
        <FogOfWar viewSize={this.props.viewSize} />
        <div id='overlay' onClick={this.handleOverlayClick}/>
        <Weapon weapon={this.state.equipment.weapon}/>
        <Armor armor={this.state.equipment.armor}/>
        <Level stats={this.state.stats}/>
      </div>
    )
  }
}

export default Game;
