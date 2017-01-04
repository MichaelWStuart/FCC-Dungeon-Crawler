class Treasure {

}

//potions

class Tonic extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 20;
  }
  static popularity() {
    return 4;
  }
  static itemLevel() {
    return 1;
  }
}

class Tonic2 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 33;
  }
  static popularity() {
    return 5;
  }
  static itemLevel() {
    return 2;
  }
}

class Tonic3 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 50;
  }
  static popularity() {
    return 6;
  }
  static itemLevel() {
    return 3;
  }
}

class Potion extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 70;
  }
  static popularity() {
    return 7;
  }
  static itemLevel() {
    return 4;
  }
}

class Potion2 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 85;
  }
  static popularity() {
    return 7;
  }
  static itemLevel() {
    return 5;
  }
}

class Potion3 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 110;
  }
  static popularity() {
    return 8;
  }
  static itemLevel() {
    return 6;
  }
}

class Elixir extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 133;
  }
  static popularity() {
    return 8;
  }
  static itemLevel() {
    return 7;
  }
}

class Elixir2 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 166;
  }
  static popularity() {
    return 8;
  }
  static itemLevel() {
    return 8;
  }
}

class Elixir3 extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 200;
  }
  static popularity() {
    return 8;
  }
  static itemLevel() {
    return 9;
  }
}

class Miracle extends Treasure {
  constructor() {
    super();
    this.type = 'potion';
    this.healing = 300;
  }
  static popularity() {
    return 9;
  }
  static itemLevel() {
    return 10;
  }
}

//weapons

class RustySword extends Treasure {
  constructor() {
    super();
    this.name = 'Rusty Sword';
    this.type = 'weapon';
    this.damage = [1, 3];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 1;
  }
}

class ShortSword extends Treasure {
  constructor() {
    super();
    this.name = 'Short Sword';
    this.type = 'weapon';
    this.damage = [1, 6];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 2;
  }
}

class LongSword extends Treasure {
  constructor() {
    super();
    this.name = 'Long Sword';
    this.type = 'weapon';
    this.damage = [2, 8];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 3;
  }
}

class Greatsword extends Treasure {
  constructor() {
    super();
    this.name = 'Greatsword';
    this.type = 'weapon';
    this.damage = [3, 12];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 4;
  }
}

class FrostyBroadsword extends Treasure {
  constructor() {
    super();
    this.name = 'Frosty Broadsword';
    this.type = 'weapon';
    this.damage = [7, 16];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 5;
  }
}

class CrystalSword extends Treasure {
  constructor() {
    super();
    this.name = 'Crystal Sword';
    this.type = 'weapon';
    this.damage = [5, 22];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 6;
  }
}

class MithrilSword extends Treasure {
  constructor() {
    super();
    this.name = 'Mithril Sword';
    this.type = 'weapon';
    this.damage = [10, 30];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 7;
  }
}

class MagicBrand extends Treasure {
  constructor() {
    super();
    this.name = 'Magic Brand';
    this.type = 'weapon';
    this.damage = [20, 40];
  }
  static popularity() {
    return 2;
  }
  static itemLevel() {
    return 8;
  }
}

class DragonboneGreatsword extends Treasure {
  constructor() {
    super();
    this.name = 'Dragonbone Greatsword';
    this.type = 'weapon';
    this.damage = [40, 60];
  }
  static popularity() {
    return 2;
  }
  static itemLevel() {
    return 9;
  }
}

class SecondBestSwordInTheGame extends Treasure {
  constructor() {
    super();
    this.name = 'Second Best Sword in the Game';
    this.type = 'weapon';
    this.damage = [40, 90];
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 10;
  }
}

//armor

class DustyArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Dusty Armor';
    this.type = 'armor';
    this.defense = 2;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 1;
  }
}

class LeatherArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Leather Armor';
    this.type = 'armor';
    this.defense = 3;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 2;
  }
}

class ChainMail extends Treasure {
  constructor() {
    super();
    this.name = 'Chain Mail';
    this.type = 'armor';
    this.defense = 4;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 3;
  }
}

class SplintMail extends Treasure {
  constructor() {
    super();
    this.name = 'Splint Mail';
    this.type = 'armor';
    this.defense = 5;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 4;
  }
}

class PlateMail extends Treasure {
  constructor() {
    super();
    this.name = 'Plate Mail';
    this.type = 'armor';
    this.defense = 6;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 5;
  }
}

class FullPlate extends Treasure {
  constructor() {
    super();
    this.name = 'Full Plate';
    this.type = 'armor';
    this.defense = 7;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 6;
  }
}

class MithrilChain extends Treasure {
  constructor() {
    super();
    this.name = 'Mithril Chain';
    this.type = 'armor';
    this.defense = 9;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 7;
  }
}

class DiamondArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Diamond Armor';
    this.type = 'armor';
    this.defense = 11;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 8;
  }
}

class DragonArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Dragon Armor';
    this.type = 'armor';
    this.defense = 14;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 9;
  }
}

class UltimateArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Ultimate Armor';
    this.type = 'armor';
    this.defense = 19;
  }
  static popularity() {
    return 1;
  }
  static itemLevel() {
    return 10;
  }
}



//---------------------------------------------------MONSTER DROPS----------------------------------------------------//

//weapons

class FangDagger extends Treasure {
  constructor() {
    super();
    this.name = 'Fang Dagger';
    this.type = 'weapon';
    this.damage = [2, 4];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class TailWhip extends Treasure {
  constructor() {
    super();
    this.name = 'Tail Whip';
    this.type = 'weapon';
    this.damage = [1, 8];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class Pincers extends Treasure {
  constructor() {
    super();
    this.name = 'Pincers';
    this.type = 'weapon';
    this.damage = [4, 5];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class Trident extends Treasure {
  constructor() {
    super();
    this.name = 'Trident';
    this.type = 'weapon';
    this.damage = [1, 12];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}



class RottingDagger extends Treasure {
  constructor() {
    super();
    this.name = 'RottingDagger';
    this.type = 'weapon';
    this.damage = [5, 11];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class DarkBrand extends Treasure {
  constructor() {
    super();
    this.name = 'Dark Brand';
    this.type = 'weapon';
    this.damage = [4, 22];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}


class BoneStiletto extends Treasure {
  constructor() {
    super();
    this.name = 'Bone Stiletto';
    this.type = 'weapon';
    this.damage = [10, 20];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}


class EtherealBlade extends Treasure {
  constructor() {
    super();
    this.name = 'Ethereal Blade';
    this.type = 'weapon';
    this.damage = [11, 33];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class FieryAvenger extends Treasure {
  constructor() {
    super();
    this.name = 'Fiery Avenger';
    this.type = 'weapon';
    this.damage = [25, 36];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class RodOfDoom extends Treasure {
  constructor() {
    super();
    this.name = 'Rod of Doom';
    this.type = 'weapon';
    this.damage = [1, 100];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}
class ObsidianEdgedClaymore extends Treasure {
  constructor() {
    super();
    this.name = 'Obsidian Edged Claymore';
    this.type = 'weapon';
    this.damage = [75, 101];
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

//armor

class Carapace extends Treasure {
  constructor() {
    super();
    this.name = 'Carapace';
    this.type = 'armor';
    this.defense = 2;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class FoxTunic extends Treasure {
  constructor() {
    super();
    this.name = 'Fox Tunic';
    this.type = 'armor';
    this.defense = 4;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class RunicTunic extends Treasure {
  constructor() {
    super();
    this.name = 'Runic Tunic';
    this.type = 'armor';
    this.defense = 5;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class AncientArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Ancient Armor';
    this.type = 'armor';
    this.defense = 6;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class OrnatePlate extends Treasure {
  constructor() {
    super();
    this.name = 'Ornate Plate';
    this.type = 'armor';
    this.defense = 8;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class ShiftingRobes extends Treasure {
  constructor() {
    super();
    this.name = 'Shifting Robes';
    this.type = 'armor';
    this.defense = 10;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class ElementalRaiment extends Treasure {
  constructor() {
    super();
    this.name = 'Elemental Raiment';
    this.type = 'armor';
    this.defense = 12;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class ChaosArmor extends Treasure {
  constructor() {
    super();
    this.name = 'Chaos Armor';
    this.type = 'armor';
    this.defense = 15;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

class DoomPlate extends Treasure {
  constructor() {
    super();
    this.name = 'Doom Plate';
    this.type = 'armor';
    this.defense = 20;
  }
  static popularity() {
    return 'special';
  }
  static itemLevel() {
    return 'special';
  }
}

export default {Tonic, Tonic2, Tonic3, Potion, Potion2, Potion3, Elixir, Elixir2, Elixir3, Miracle,
  RustySword, ShortSword, LongSword, Greatsword, FrostyBroadsword, CrystalSword, MithrilSword, MagicBrand,
  DragonboneGreatsword, SecondBestSwordInTheGame, DustyArmor, LeatherArmor, ChainMail, SplintMail, PlateMail, FullPlate,
  MithrilChain, DiamondArmor, DragonArmor, UltimateArmor, Carapace, FangDagger, TailWhip, Pincers, FoxTunic, Trident,
  RunicTunic, RottingDagger, DarkBrand, AncientArmor, OrnatePlate, BoneStiletto, ShiftingRobes, EtherealBlade,
  FieryAvenger, ElementalRaiment, ChaosArmor, RodOfDoom, DoomPlate, ObsidianEdgedClaymore};
