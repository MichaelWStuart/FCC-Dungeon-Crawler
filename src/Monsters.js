import avian from './Avian0.png';
import reptile from './Reptile0.png';
import pest from './Pest0.png';
import rodent from './Rodent0.png';
import undead from './Undead0.png';
import elemental from './Elemental0.png';
import demon from './Demon0.png';
import humanoid from './Humanoid0.png';


class Monster {

  attack(defence) {
    if (defence < this.power) {
      return this.power - defence;
    } else {
      return 1;
    }
  }

  defend(attack) {
    return this.health -= attack;
  }

  isAdjacent(playerPosition) {
    const [pX, pY] = playerPosition;
    const [mX, mY] = this.position;
    if ((mX === pX) && (mY === (pY - 1))) {
      return [0, -32];
    } else if ((mX === pX) && (mY === (pY + 1))) {
      return [0, 32];
    } else if ((mX === (pX - 1)) && (mY === pY)) {
      return [-32, 0];
    } else if ((mX === (pX + 1)) && (mY === pY)) {
      return [32, 0];
    }
  }

  dropLoot() {
    const lootRoll = Math.random();
    if (lootRoll < this.loot.dropOdds) {
      return this.loot;
    }
  }
}

class Bat extends Monster {
  constructor() {
    super();
    this.health = 7;
    this.maxHealth = 7;
    this.power = 2;
    this.exp = 1;
    this.src = avian;
    this.x = 0;
    this.y = 176;
    this.loot = {
      dropOdds: .08,
      name: 'Fang Dagger',
      type: 'weapon',
      damage: [2,4]
    }
  }
  static monsterLevel() {
    return 1;
  }
}

class Snake extends Monster {
  constructor() {
    super();
    this.health = 6;
    this.maxHealth = 6;
    this.power = 3;
    this.exp = 2;
    this.src = reptile;
    this.x = 48;
    this.y = 64;
    this.loot = {
      dropOdds: .25,
      name: 'Tonic',
      type: 'potion',
      healing: 20
    }
  }
  static monsterLevel() {
    return 1;
  }
}

class Spider extends Monster {
  constructor() {
    super();
    this.health = 8;
    this.maxHealth = 8;
    this.power = 2;
    this.exp = 1;
    this.src = pest;
    this.x = 16;
    this.y = 64;
    this.loot = {
      dropOdds: .11,
      name: 'Carapace',
      type: 'armor',
      defense: 2
    }
  }
  static monsterLevel() {
    return 1;
  }
}

class Rat extends Monster {
  constructor() {
    super();
    this.health = 18;
    this.maxHealth = 18;
    this.power = 6;
    this.exp = 4;
    this.src = rodent;
    this.x = 0;
    this.y = 32;
    this.loot = {
      dropOdds: .11,
      name: 'Tail Whip',
      type: 'weapon',
      damage: [1,8]
    }
  }
  static monsterLevel() {
    return 2;
  }
}

class Scorpion extends Monster {
  constructor() {
    super();
    this.health = 20;
    this.maxHealth = 20;
    this.power = 5;
    this.exp = 4;
    this.src = pest;
    this.x = 80;
    this.y = 32;
    this.loot = {
      dropOdds: .04,
      name: 'Pincers',
      type: 'weapon',
      damage: [4,5]
    }
  }
  static monsterLevel() {
    return 2;
  }
}

class Lizard extends Monster {
  constructor() {
    super();
    this.health = 17;
    this.maxHealth = 17;
    this.power = 7;
    this.exp = 5;
    this.src = reptile;
    this.x = 64;
    this.y = 16;
    this.loot = {
      dropOdds: .33,
      name: 'Tonic',
      type: 'potion',
      healing: 35
    }
  }
  static monsterLevel() {
    return 2;
  }
}

class GreenWhelp extends Monster {
  constructor() {
    super();
    this.health = 25;
    this.maxHealth = 25;
    this.power = 11;
    this.exp = 19;
    this.src = reptile;
    this.x = 64;
    this.y = 32;
    this.loot = {
      dropOdds: .33,
      name: 'Tonic',
      type: 'potion',
      healing: 50
    }
  }
  static monsterLevel() {
    return 3;
  }
}

class DemonFox extends Monster {
  constructor() {
    super();
    this.health = 21;
    this.maxHealth = 21;
    this.power = 12;
    this.exp = 20;
    this.src = reptile;
    this.x = 0;
    this.y = 0;
    this.loot = {
      dropOdds: .13,
      name: 'Fox Tunic',
      type: 'armor',
      defense: 4
    }
  }
  static monsterLevel() {
    return 3;
  }
}

class SnakeLady extends Monster {
  constructor() {
    super();
    this.health = 18;
    this.maxHealth = 18;
    this.power = 13;
    this.exp = 22;
    this.src = reptile;
    this.x = 16;
    this.y = 112;
    this.loot = {
      dropOdds: .09,
      name: 'Trident',
      type: 'weapon',
      damage: [1,12]
    }
  }
  static monsterLevel() {
    return 3;
  }
}

class Skeleton extends Monster {
  constructor() {
    super();
    this.health = 33;
    this.maxHealth = 33;
    this.power = 15;
    this.exp = 99;
    this.src = undead;
    this.x = 0;
    this.y = 32;
    this.loot = {
      dropOdds: .08,
      name: 'Runic Tunic',
      type: 'armor',
      defense: 5
    }
  }
  static monsterLevel() {
    return 4;
  }
}

class Specter extends Monster {
  constructor() {
    super();
    this.health = 31;
    this.maxHealth = 31;
    this.power = 14;
    this.exp = 94;
    this.src = undead;
    this.x = 0;
    this.y = 96;
    this.loot = {
      dropOdds: .22,
      name: 'Potion',
      type: 'potion',
      healing: 65
    }
  }
  static monsterLevel() {
    return 4;
  }
}

class Zombie extends Monster {
  constructor() {
    super();
    this.health = 35;
    this.maxHealth = 35;
    this.power = 16;
    this.exp = 112;
    this.src = undead;
    this.x = 64;
    this.y = 0;
    this.loot = {
      dropOdds: .05,
      name: 'Rotting Dagger',
      type: 'weapon',
      damage: [5,11]
    }
  }
  static monsterLevel() {
    return 4;
  }
}

class DarkBones extends Monster {
  constructor() {
    super();
    this.health = 45;
    this.maxHealth = 45;
    this.power = 22;
    this.exp = 464;
    this.src = undead;
    this.x = 48;
    this.y = 32;
    this.loot = {
      dropOdds: .05,
      name: 'Dark Brand',
      type: 'weapon',
      damage: [4,22]
    }
  }
  static monsterLevel() {
    return 5;
  }
}

class Banshee extends Monster {
  constructor() {
    super();
    this.health = 48;
    this.maxHealth = 48;
    this.power = 21;
    this.exp = 435;
    this.src = undead;
    this.x = 0;
    this.y = 80;
    this.loot = {
      dropOdds: .23,
      name: 'Potion',
      type: 'potion',
      healing: 80
    }
  }
  static monsterLevel() {
    return 5;
  }
}

class Mummy extends Monster {
  constructor() {
    super();
    this.health = 55;
    this.maxHealth = 55;
    this.power = 24;
    this.exp = 551;
    this.src = undead;
    this.x = 80;
    this.y = 16;
    this.loot = {
      dropOdds: .05,
      name: 'Ancient Armor',
      type: 'armor',
      defense: 6
    }
  }
  static monsterLevel() {
    return 5;
  }
}

class Orc extends Monster {
  constructor() {
    super();
    this.health = 89;
    this.maxHealth = 89;
    this.power = 29;
    this.exp = 2110;
    this.src = undead;
    this.x = 0;
    this.y = 48;
    this.loot = {
      dropOdds: .28,
      name: 'Potion',
      type: 'potion',
      healing: 100
    }
  }
  static monsterLevel() {
    return 6;
  }
}

class Magus extends Monster {
  constructor() {
    super();
    this.health = 61;
    this.maxHealth = 61;
    this.power = 33;
    this.exp = 2542;
    this.src = undead;
    this.x = 16;
    this.y = 112;
    this.loot = {
      dropOdds: .09,
      name: 'Boney Poker',
      type: 'weapon',
      damage: [10,20]
    }
  }
  static monsterLevel() {
    return 6;
  }
}

class Goblin extends Monster {
  constructor() {
    super();
    this.health = 72;
    this.maxHealth = 72;
    this.power = 27;
    this.exp = 1911;
    this.src = undead;
    this.x = 32;
    this.y = 0;
    this.loot = {
      dropOdds: .13,
      name: 'Ornate Plate',
      type: 'armor',
      defense: 8
    }
  }
  static monsterLevel() {
    return 6;
  }
}

class Ghost extends Monster {
  constructor() {
    super();
    this.health = 111;
    this.maxHealth = 111;
    this.power = 37;
    this.exp = 3045;
    this.src = undead;
    this.x = 32;
    this.y = 64;
    this.loot = {
      dropOdds: .12,
      name: 'Ethereal Blade',
      type: 'weapon',
      damage: [11,33]
    }
  }
  static monsterLevel() {
    return 7;
  }
}

class Wizard extends Monster {
  constructor() {
    super();
    this.health = 74;
    this.maxHealth = 74;
    this.power = 44;
    this.exp = 3556;
    this.src = undead;
    this.x = 32;
    this.y = 96;
    this.loot = {
      dropOdds: .09,
      name: 'Shifting Robes',
      type: 'armor',
      defense: 10
    }
  }
  static monsterLevel() {
    return 7;
  }
}

class Jackal extends Monster {
  constructor() {
    super();
    this.health = 117;
    this.maxHealth = 117;
    this.power = 36;
    this.exp = 2799;
    this.src = undead;
    this.x = 0;
    this.y = 144;
    this.loot = {
      dropOdds: .30,
      name: 'Elixir',
      type: 'potion',
      healing: 125
    }
  }
  static monsterLevel() {
    return 7;
  }
}

class FireBones extends Monster {
  constructor() {
    super();
    this.health = 191;
    this.maxHealth = 191;
    this.power = 43;
    this.exp = 6600;
    this.src = undead;
    this.x = 16;
    this.y = 32;
    this.loot = {
      dropOdds: .10,
      name: 'Fiery Runesword',
      type: 'weapon',
      damage: [25,36]
    }
  }
  static monsterLevel() {
    return 8;
  }
}

class FireSoul extends Monster {
  constructor() {
    super();
    this.health = 141;
    this.maxHealth = 141;
    this.power = 42;
    this.exp = 5900;
    this.src = elemental;
    this.x = 32;
    this.y = 48;
    this.loot = {
      dropOdds: .25,
      name: 'Elixir',
      type: 'potion',
      healing: 155
    }
  }
  static monsterLevel() {
    return 8;
  }
}

class Elemental extends Monster {
  constructor() {
    super();
    this.health = 230;
    this.maxHealth = 230;
    this.power = 41;
    this.exp = 7100;
    this.src = elemental;
    this.x = 32;
    this.y = 64;
    this.loot = {
      dropOdds: .07,
      name: 'Elemental Raiment',
      type: 'armor',
      defense: 12
    }
  }
  static monsterLevel() {
    return 8;
  }
}

class Demon extends Monster {
  constructor() {
    super();
    this.health = 316;
    this.maxHealth = 316;
    this.power = 51;
    this.exp = 15666;
    this.src = demon;
    this.x = 32;
    this.y = 16;
    this.loot = {
      dropOdds: .06,
      name: 'Chaos Armor',
      type: 'armor',
      defense: 15
    }
  }
  static monsterLevel() {
    return 9;
  }
}

class Beholder extends Monster {
  constructor() {
    super();
    this.health = 275;
    this.maxHealth = 275;
    this.power = 50;
    this.exp = 14092;
    this.src = elemental;
    this.x = 32;
    this.y = 80;
    this.loot = {
      dropOdds: .25,
      name: 'Elixir',
      type: 'potion',
      healing: 190
    }
  }
  static monsterLevel() {
    return 9;
  }
}

class Necromancer extends Monster {
  constructor() {
    super();
    this.health = 140;
    this.maxHealth = 140;
    this.power = 63;
    this.exp = 17200;
    this.src = undead;
    this.x = 112;
    this.y = 32;
    this.loot = {
      dropOdds: .07,
      name: 'Doom Edge',
      type: 'weapon',
      damage: [1,99]
    }
  }
  static monsterLevel() {
    return 9;
  }
}

class Shadow extends Monster {
  constructor() {
    super();
    this.health = 278;
    this.maxHealth = 278;
    this.power = 58;
    this.exp = 29000;
    this.src = elemental;
    this.x = 48;
    this.y = 32;
    this.loot = {
      dropOdds: .03,
      name: 'Obsidian Edged Claymore',
      type: 'weapon',
      damage: [75,100]
    }
  }
  static monsterLevel() {
    return 10;
  }
}

class PitLord extends Monster {
  constructor() {
    super();
    this.health = 365;
    this.maxHealth = 365;
    this.power = 54;
    this.exp = 29000;
    this.src = demon;
    this.x = 48;
    this.y = 16;
    this.loot = {
      dropOdds: .04,
      name: 'Doom Plate',
      type: 'armor',
      defense: 20
    }
  }
  static monsterLevel() {
    return 10;
  }
}

class Lich extends Monster {
  constructor() {
    super();
    this.health = 160;
    this.maxHealth = 160;
    this.power = 73;
    this.exp = 33000;
    this.src = undead;
    this.x = 96;
    this.y = 32;
    this.loot = {
      dropOdds: .23,
      name: 'Miracle',
      type: 'potion',
      healing: 300
    }
  }
  static monsterLevel() {
    return 10;
  }
}

class Goddess extends Monster {
  constructor() {
    super();
    this.health = 777;
    this.maxHealth = 777;
    this.power = 77;
    this.exp = 0;
    this.src = humanoid;
    this.x = 80;
    this.y = 48;
  }
  static monsterLevel() {
    return 'Boss';
  }
}

export default () => {
  return [
    [Bat, Snake, Spider],
    [Rat, Scorpion, Lizard],
    [GreenWhelp, DemonFox, SnakeLady],
    [Skeleton, Specter, Zombie],
    [DarkBones, Banshee, Mummy],
    [Orc, Magus, Goblin],
    [Ghost, Wizard, Jackal],
    [FireBones, FireSoul, Elemental],
    [Demon, Beholder,Necromancer],
    [Shadow, PitLord, Lich],
    [Goddess]
  ];
}
