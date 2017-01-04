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
    if (lootRoll < this.lootOdds) {
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
    this.lootOdds = .08;
    this.loot = 'FangDagger';
    this.src = avian;
    this.x = 0;
    this.y = 176;
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
    this.lootOdds = .25;
    this.loot = 'Tonic';
    this.src = reptile;
    this.x = 48;
    this.y = 64;
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
    this.lootOdds = .12;
    this.loot = 'Carapace';
    this.src = pest;
    this.x = 16;
    this.y = 64;
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
    this.lootOdds = .11;
    this.loot = 'TailWhip';
    this.src = rodent;
    this.x = 0;
    this.y = 32;
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
    this.lootOdds = .04;
    this.loot = 'Pincers';
    this.src = pest;
    this.x = 80;
    this.y = 32;
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
    this.lootOdds = .33;
    this.loot = 'Tonic2';
    this.src = reptile;
    this.x = 64;
    this.y = 16;
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
    this.lootOdds = .33;
    this.loot = 'Tonic3';
    this.src = reptile;
    this.x = 64;
    this.y = 32;
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
    this.lootOdds = .13;
    this.loot = 'FoxTunic';
    this.src = reptile;
    this.x = 0;
    this.y = 0;
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
    this.lootOdds = .09;
    this.loot = 'Trident';
    this.src = reptile;
    this.x = 16;
    this.y = 112;
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
    this.lootOdds = .08;
    this.loot = 'RunicTunic';
    this.src = undead;
    this.x = 0;
    this.y = 32;
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
    this.lootOdds = .22;
    this.loot = 'Potion';
    this.src = undead;
    this.x = 0;
    this.y = 96;
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
    this.lootOdds = .05;
    this.loot = 'RottingDagger';
    this.src = undead;
    this.x = 64;
    this.y = 0;
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
    this.lootOdds = .05;
    this.loot = 'DarkBrand';
    this.src = undead;
    this.x = 48;
    this.y = 32;
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
    this.lootOdds = .23;
    this.loot = 'Potion2';
    this.src = undead;
    this.x = 0;
    this.y = 80;
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
    this.lootOdds = .03;
    this.loot = 'AncientArmor';
    this.src = undead;
    this.x = 80;
    this.y = 16;
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
    this.lootOdds = .33;
    this.loot = 'Potion3';
    this.src = undead;
    this.x = 0;
    this.y = 48;
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
    this.lootOdds = .09;
    this.loot = 'BoneStiletto';
    this.src = undead;
    this.x = 16;
    this.y = 112;
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
    this.lootOdds = .13;
    this.loot = 'OrnatePlate';
    this.src = undead;
    this.x = 32;
    this.y = 0;
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
    this.lootOdds = .12;
    this.loot = 'EtherealBlade';
    this.src = undead;
    this.x = 32;
    this.y = 64;
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
    this.lootOdds = .09;
    this.loot = 'ShiftingRobes';
    this.src = undead;
    this.x = 32;
    this.y = 96;
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
    this.lootOdds = .33;
    this.loot = 'Elixir';
    this.src = undead;
    this.x = 0;
    this.y = 144;
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
    this.lootOdds = .10;
    this.loot = 'FieryAvenger';
    this.src = undead;
    this.x = 16;
    this.y = 32;
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
    this.lootOdds = .25;
    this.loot = 'Elixir2';
    this.src = elemental;
    this.x = 32;
    this.y = 48;
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
    this.lootOdds = .05;
    this.loot = 'ElementalRaiment';
    this.src = elemental;
    this.x = 32;
    this.y = 64;
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
    this.lootOdds = .06;
    this.loot = 'ChaosArmor';
    this.src = demon;
    this.x = 32;
    this.y = 16;
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
    this.lootOdds = .25;
    this.loot = 'Elixir3';
    this.src = elemental;
    this.x = 32;
    this.y = 80;
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
    this.lootOdds = .07;
    this.loot = 'RodOfDoom';
    this.src = undead;
    this.x = 112;
    this.y = 32;
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
    this.lootOdds = .04;
    this.loot = 'ObsidianEdgedClaymore';
    this.src = elemental;
    this.x = 48;
    this.y = 32;
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
    this.lootOdds = .04;
    this.loot = 'DoomPlate';
    this.src = demon;
    this.x = 48;
    this.y = 16;
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
    this.lootOdds = .23;
    this.loot = 'Miracle';
    this.src = undead;
    this.x = 96;
    this.y = 32;
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
    this.lootOdds = 0;
    this.loot = 'victory';
    this.src = humanoid;
    this.x = 80;
    this.y = 48;
  }
  static monsterLevel() {
    return 'Boss';
  }
}

export default {Bat, Snake, Spider, Rat, Scorpion, Lizard, GreenWhelp, DemonFox, SnakeLady, Skeleton, Specter, Zombie,
  DarkBones, Banshee, Mummy, Orc, Magus, Goblin, Ghost, Wizard, Jackal, FireBones, FireSoul, Elemental, Demon, Beholder,
  Necromancer, Shadow, PitLord, Lich, Goddess};
