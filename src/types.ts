export interface CharacterState {
  hp: number;
  tempHp: number;
  isRageActive: boolean;
  isRecklessActive: boolean;
  isDeflectionActive: boolean;
  rageSlots: boolean[]; // 3 slots
  spellSlots: boolean[]; // 3 slots
  arcaneRecoveryUsed: boolean;
  longstriderActive: boolean;
}

export interface Spell {
  id: string;
  name: string;
  namePt: string;
  level: 0 | 1;
  type: 'cantrip' | 'prepared' | 'unprepared' | 'ritual';
  duration: string;
  castingTime: string;
  range: string;
  components: string;
  description: string;
  notInRage?: boolean;
  actionText?: string;
}

export interface Attribute {
  name: string;
  code: string;
  value: number;
  modifier: number;
  savingThrowProficient: boolean;
  savingThrowBonus: number;
}
