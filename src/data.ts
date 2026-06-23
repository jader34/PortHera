import { Attribute, Spell } from './types';

export const CHARACTER_INFO = {
  name: "O Portador da Herança",
  title: "Guerreiro Rúnico Primordial",
  classLevel: "Nível 5 (Bárbaro Totêmico 3 / Mago da Guerra 2)",
  race: "Humano Variante",
  baseAc: 19,
  maxHp: 44,
  proficiencyBonus: 3,
  speedBase: 9, // 9 metros/30 feet
  passiveWisdom: 9, // 10 + (-1 wisdom modifier)
  spellDc: 12, // 8 + 3 prof + 1 Int
  spellAttack: 4, // 3 prof + 1 Int
  rageMaxUsages: 3,
  spellLevel1MaxSlots: 3,
};

export const ATTRIBUTES: Attribute[] = [
  { name: "Força", code: "FOR", value: 16, modifier: 3, savingThrowProficient: true, savingThrowBonus: 6 },
  { name: "Destreza", code: "DES", value: 14, modifier: 2, savingThrowProficient: false, savingThrowBonus: 2 },
  { name: "Constituição", code: "CON", value: 14, modifier: 2, savingThrowProficient: true, savingThrowBonus: 5 },
  { name: "Inteligência", code: "INT", value: 13, modifier: 1, savingThrowProficient: false, savingThrowBonus: 1 },
  { name: "Sabedoria", code: "SAB", value: 9, modifier: -1, savingThrowProficient: false, savingThrowBonus: -1 },
  { name: "Carisma", code: "CAR", value: 8, modifier: -1, savingThrowProficient: false, savingThrowBonus: -1 },
];

export const SPELLS: Spell[] = [
  // Cantrips
  {
    id: "booming_blade",
    name: "Booming Blade",
    namePt: "Lâmina Estrondosa",
    level: 0,
    type: "cantrip",
    duration: "1 rodada",
    castingTime: "1 ação",
    range: "1.5m (Arma)",
    components: "S, M (uma arma)",
    description: "Você faz um ataque corpo-a-corpo de arma. Se atingir, o alvo sofre os efeitos normais e fica envolto em energia sônica rúnica. Se o alvo se mover voluntariamente por mais de 1.5 metros antes do início do seu próximo turno, sofrerá imediatamente 1d8 de dano Trovejante. (No nível 5, o ataque inicial também causa +1d8 de dano Trovejante no acerto!).",
    notInRage: true
  },
  {
    id: "mind_sliver",
    name: "Mind Sliver",
    namePt: "Espeto Mental",
    level: 0,
    type: "cantrip",
    duration: "1 rodada",
    castingTime: "1 ação",
    range: "18m",
    components: "V",
    description: "Você canaliza uma agulha de energia psíquica. O alvo deve passar em um Salvaguarda de Inteligência contra CD 12. Se falhar, sofre 1d6 de dano Psíquico e subtrai 1d4 da próxima jogada de salvaguarda que fizer antes do fim do seu próximo turno.",
    notInRage: true
  },
  {
    id: "mage_hand",
    name: "Mage Hand",
    namePt: "Mão Mágica",
    level: 0,
    type: "cantrip",
    duration: "1 minuto",
    castingTime: "1 ação",
    range: "9m",
    components: "V, S",
    description: "Uma mão espectral surge em um ponto escolhido. Você pode usá-la para manipular um objeto, abrir portas não trancadas, guardar/retirar itens ou despejar recipientes. Ela não pode atacar ou ativar itens mágicos, e pode carregar até 4.5 kg."
  },
  // Level 1 Prepared
  {
    id: "false_life",
    name: "False Life",
    namePt: "Vida Falsa",
    level: 1,
    type: "prepared",
    duration: "1 hora",
    castingTime: "1 ação",
    range: "Pessoal",
    components: "V, S, M (álcool)",
    description: "Você se fortalece com uma imitação necromântica de vitalidade. Ao conjurar, adicione manualmente de 1d4 + 4 pontos de vida temporários no seu contador de PV Temp.",
    notInRage: true
  },
  {
    id: "longstrider",
    name: "Longstrider",
    namePt: "Passos Longos",
    level: 1,
    type: "prepared",
    duration: "1 hora",
    castingTime: "1 ação",
    range: "Toque",
    components: "V, S, M (terra)",
    description: "Você toca uma criatura. O deslocamento dela aumenta em 3 metros (+10 ft) até a magia acabar. Pode ser ativada antes de entrar em Fúria, mantendo o benefício!",
    notInRage: false
  },
  {
    id: "shield",
    name: "Shield",
    namePt: "Escudo Arcano",
    level: 1,
    type: "prepared",
    duration: "1 rodada",
    castingTime: "1 reação",
    range: "Pessoal",
    components: "V, S",
    description: "Reação tomada quando você é atingido por um ataque ou alvo de Mísseis Mágicos. Uma barreira surge, concedendo +5 na CA (incluindo contra o ataque gatilho) e imunidade a Mísseis Mágicos até o início de seu próximo turno.",
    notInRage: true
  },
  // Rituals
  {
    id: "find_familiar",
    name: "Find Familiar",
    namePt: "Encontrar Familiar",
    level: 1,
    type: "ritual",
    duration: "Instantânea",
    castingTime: "1 hora (Ritual)",
    range: "3m",
    components: "V, S, M (10 PO de incensivos)",
    description: "Você ganha os serviços de um espírito que assume a forma de um animal (corvo, coruja, etc.). O familiar não pode atacar, mas pode usar a ação Ajudar (Help) em combate perto de inimigos para conceder VANTAGEM no próximo ataque do Portador da Herança!"
  },
  {
    id: "alarm",
    name: "Alarm",
    namePt: "Alarme",
    level: 1,
    type: "ritual",
    duration: "8 horas",
    castingTime: "1 minuto (Ritual)",
    range: "9m",
    components: "V, S, M (sino e fio de prata)",
    description: "Você estabelece um alarme em uma área de até 6 metros cúbicos. Escolha se o alarme será mental (até 9 metros de distância de você) ou audível (um sino ruidoso)."
  },
  {
    id: "unseen_servant",
    name: "Unseen Servant",
    namePt: "Servo Invisível",
    level: 1,
    type: "ritual",
    duration: "1 hora",
    castingTime: "1 ação (Ritual)",
    range: "18m",
    components: "V, S, M (linha e madeira)",
    description: "Cria uma força invisível, acéfala e sem forma que realiza tarefas simples de forma obediente (arrumar acampamento, servir comida, limpar poeira) até 18m de você."
  },
  {
    id: "detect_magic",
    name: "Detect Magic",
    namePt: "Detectar Magia",
    level: 1,
    type: "ritual",
    duration: "Concentração, até 10 minutos",
    castingTime: "1 ação (Ritual)",
    range: "Pessoal (raio de 9 metros)",
    components: "V, S",
    description: "Você sente a presença de magia a até 9 metros de você. Se sentir magia desta forma, você pode usar uma ação para ver uma aura tênue ao redor de qualquer criatura ou objeto visível na área que possua magia, e aprender qual escola de magia ela emana, se houver.",
    notInRage: true
  },
  {
    id: "thunderwave",
    name: "Thunderwave",
    namePt: "Onda Trovejante",
    level: 1,
    type: "unprepared",
    duration: "Instantânea",
    castingTime: "1 ação",
    range: "Pessoal (cubo de 4.5m)",
    components: "V, S",
    description: "Uma onda de força trovejante violenta emana de você. Cada criatura num cubo de 4.5 metros (15 ft) centrado em você deve fazer um Salvaguarda de Constituição (CD 12). Em caso de falha, sofre 2d8 de dano Trovejante e é empurrada 3 metros para trás. Se passar, sofre metade do dano e não é empurrada. Além disso, objetos na área são empurrados e um trovão estrondoso surge audível a até 90 metros de distância.",
    notInRage: true
  }
];
