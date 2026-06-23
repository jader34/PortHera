import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, AlertTriangle, Zap, Eye, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { CharacterState, Attribute } from '../types';
import { ATTRIBUTES, CHARACTER_INFO } from '../data';

interface StatusTabProps {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  onLongRest: () => void;
}

interface Skill {
  name: string;
  enName: string;
  abilityCode: 'FOR' | 'DES' | 'CON' | 'INT' | 'SAB' | 'CAR';
  proficient: boolean;
  source?: string;
}

const SKILLS_LIST: Skill[] = [
  { name: 'Atletismo', enName: 'Athletics', abilityCode: 'FOR', proficient: true, source: 'Pelo Antecedente (Forasteiro)' },
  { name: 'Sobrevivência', enName: 'Survival', abilityCode: 'SAB', proficient: true, source: 'Pelo Antecedente (Forasteiro)' },
  { name: 'Arcanismo', enName: 'Arcana', abilityCode: 'INT', proficient: true, source: 'Pela Classe (Bárbaro)' },
  { name: 'Percepção', enName: 'Perception', abilityCode: 'SAB', proficient: true, source: 'Pela Classe (Bárbaro)' },
  { name: 'História', enName: 'History', abilityCode: 'INT', proficient: true, source: 'Pela Classe (Humano)' },

  { name: 'Acrobatismo', enName: 'Acrobatics', abilityCode: 'DES', proficient: false },
  { name: 'Adestrar Animais', enName: 'Animal Handling', abilityCode: 'SAB', proficient: false },
  { name: 'Atuação', enName: 'Performance', abilityCode: 'CAR', proficient: false },
  { name: 'Enganação', enName: 'Deception', abilityCode: 'CAR', proficient: false },
  { name: 'Furtividade', enName: 'Stealth', abilityCode: 'DES', proficient: false },
  { name: 'Intimidação', enName: 'Intimidation', abilityCode: 'CAR', proficient: false },
  { name: 'Intuição', enName: 'Insight', abilityCode: 'SAB', proficient: false },
  { name: 'Investigação', enName: 'Investigation', abilityCode: 'INT', proficient: false },
  { name: 'Medicina', enName: 'Medicine', abilityCode: 'SAB', proficient: false },
  { name: 'Natureza', enName: 'Nature', abilityCode: 'INT', proficient: false },
  { name: 'Persuasão', enName: 'Persuasion', abilityCode: 'CAR', proficient: false },
  { name: 'Prestidigitação', enName: 'Sleight of Hand', abilityCode: 'DES', proficient: false },
  { name: 'Religião', enName: 'Religion', abilityCode: 'INT', proficient: false },
];

export default function StatusTab({ state, setState, onLongRest }: StatusTabProps) {
  const [showConfirmLongRest, setShowConfirmLongRest] = React.useState<boolean>(false);
  const [showAllSkills, setShowAllSkills] = React.useState<boolean>(false);

  // Helper to dynamically calculate skill modifier using Core Attributes & Proficiency Bonus (+3)
  const getSkillModifier = (skill: Skill) => {
    const attr = ATTRIBUTES.find(a => a.code === skill.abilityCode);
    const baseMod = attr ? attr.modifier : 0;
    return skill.proficient ? baseMod + CHARACTER_INFO.proficiencyBonus : baseMod;
  };

  // Toggle individual Rage checkbox usage
  const handleRageSlotClick = (index: number) => {
    setState(prev => {
      const nextSlots = [...prev.rageSlots];
      nextSlots[index] = !nextSlots[index];
      return { ...prev, rageSlots: nextSlots };
    });
  };

  // Toggle Spell Slot checkbox usage
  const handleSpellSlotClick = (index: number) => {
    setState(prev => {
      const nextSlots = [...prev.spellSlots];
      nextSlots[index] = !nextSlots[index];
      return { ...prev, spellSlots: nextSlots };
    });
  };

  // Arcane Recovery: Restores 1 spell slot if one is spent, and can only be used once per day.
  const handleArcaneRecovery = () => {
    setState(prev => {
      if (prev.arcaneRecoveryUsed) return prev;
      
      // Find a spent spell slot (which is stored as 'true')
      const spentIndex = prev.spellSlots.indexOf(true);
      if (spentIndex === -1) {
        // No slots are spent, nothing to recover
        alert("Todos os seus espaços de magia já estão cheios!");
        return prev;
      }

      const nextSlots = [...prev.spellSlots];
      nextSlots[spentIndex] = false; // Restore slot (unspent)

      return {
        ...prev,
        spellSlots: nextSlots,
        arcaneRecoveryUsed: true
      };
    });
  };

  // Format modifier (+3, -1, etc.)
  const formatMod = (val: number) => {
    return val >= 0 ? `+${val}` : `${val}`;
  };

  return (
    <div className="px-4 pb-20 flex flex-col gap-5 select-none animate-fade-in">
      
      {/* Visual Resistances Warning under Bear Totem (changes when Raging) */}
      <div className={`rounded-xl p-3 border transition-all duration-300 ${
        state.isRageActive 
          ? 'bg-amber-950/30 border-amber-500/60 shadow-[0_0_12px_rgba(133,77,14,0.25)]' 
          : 'bg-dark-panel border-dark-border'
      }`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <ShieldCheck className={`w-4 h-4 ${state.isRageActive ? 'text-amber-500' : 'text-gray-400'}`} />
          <h3 className="text-xs font-display font-semibold uppercase tracking-wider text-amber-200">
            Resistências de Classe (Totem do Urso)
          </h3>
        </div>
        
        {state.isRageActive ? (
          <div className="text-xs">
            <span className="inline-block py-0.5 px-2 bg-amber-500 text-dark-antracite font-extrabold uppercase rounded text-[10px] tracking-wide mb-1 animate-pulse">
              🛡️ TOQUE DO URSO ATIVO
            </span>
            <p className="text-amber-200/90 font-sans leading-tight">
              Você tem <strong className="font-extrabold text-amber-300">RESISTÊNCIA A TODOS OS DANOS</strong> (exceto Psíquico): Cortante, Perfurante, Concussivo, Ácido, Fogo, Frio, Elétrico, Sônico, Necrótico, Radiante, Venenoso e Força!
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-400 leading-tight">
            Quando estiver em <strong className="text-amber-500">Fúria</strong>, você ganha resistência a todos os tipos de dano exceto Psíquico (Passivo do Totem do Urso).
          </p>
        )}
      </div>

      {/* Attributes Bento Grid */}
      <div>
        <h3 className="text-xs font-display font-semibold uppercase text-gray-400 tracking-widest mb-2.5">
          Atributos Primordiais
        </h3>
        
        <div className="grid grid-cols-3 gap-2">
          {ATTRIBUTES.map((attr) => {
            const isProficient = attr.savingThrowProficient;
            return (
              <div 
                key={attr.code}
                className="bg-dark-panel border border-dark-border rounded-xl p-2.5 flex flex-col items-center justify-center text-center relative transition-colors active:bg-gray-800"
              >
                <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
                  {attr.name}
                </span>
                
                <span className="text-2xl font-mono font-black text-white my-0.5 leading-none">
                  {formatMod(attr.modifier)}
                </span>
                
                <span className="text-[10px] font-mono text-gray-400 bg-gray-950 px-1.5 py-0.5 rounded leading-none">
                  {attr.value}
                </span>

                {isProficient && (
                  <span 
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" 
                    title="Salvaguarda Proficiente" 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Saving Throws (Salvaguardas) List with advantages */}
      <div>
        <h3 className="text-xs font-display font-semibold uppercase text-gray-400 tracking-widest mb-2.5">
          Salvaguardas (Testes de Resistência)
        </h3>

        <div className="flex flex-col gap-1.5">
          {ATTRIBUTES.map((attr) => {
            const hasRageStrengthAdvantage = attr.code === 'FOR' && state.isRageActive;
            const hasDangerSenseAdvantage = attr.code === 'DES'; // danger sense grants Dex save advantage for things you can see

            return (
              <div 
                key={attr.code} 
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  hasRageStrengthAdvantage 
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_8px_rgba(133,77,14,0.15)] col-span-2'
                    : 'bg-dark-panel border-dark-border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-6 rounded ${attr.savingThrowProficient ? 'bg-amber-500' : 'bg-gray-800'}`} />
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-200">
                      {attr.name} ({attr.code})
                    </span>
                    
                    {hasRageStrengthAdvantage && (
                      <span className="block text-[9px] font-sans font-extrabold text-amber-400 uppercase tracking-wide leading-none mt-0.5 animate-pulse">
                        🔥 Vantagem (Fúria Ativa)
                      </span>
                    )}

                    {hasDangerSenseAdvantage && (
                      <span className="block text-[9px] font-sans font-bold text-cyan-400/90 leading-none mt-0.5 flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5 inline" /> Sentido de Perigo (Vantagem vs Efeitos Visíveis)
                      </span>
                    )}
                  </div>
                </div>

                <div className="font-mono text-sm font-semibold bg-gray-950 py-1 px-2.5 rounded border border-dark-border text-gray-100">
                  {formatMod(attr.savingThrowBonus)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Perícias (Skills) Section */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-xs font-display font-semibold uppercase text-gray-400 tracking-widest">
            Perícias
          </h3>
          <span className="text-[10px] font-mono text-gray-500">
            {showAllSkills ? 'Mostrando Todas (18)' : 'Somente Treinadas (5)'}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {SKILLS_LIST.filter(skill => showAllSkills || skill.proficient).map((skill) => {
            const skillModifier = getSkillModifier(skill);
            const isStrengthAthleticsAdvantage = skill.abilityCode === 'FOR' && state.isRageActive;

            return (
              <div 
                key={skill.enName}
                style={{ minHeight: '44px' }}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  skill.proficient 
                    ? isStrengthAthleticsAdvantage
                      ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_8px_rgba(133,77,14,0.15)]'
                      : 'bg-amber-950/10 border-amber-500/20' 
                    : 'bg-dark-panel border-dark-border opacity-75'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-6 rounded ${skill.proficient ? 'bg-amber-500' : 'bg-gray-800'}`} />
                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="text-xs font-mono font-bold text-gray-200">
                        {skill.name} <span className="text-gray-400 font-normal">({skill.enName})</span>
                      </span>
                      <span className="text-[9px] font-mono font-black text-gray-400 bg-gray-950 px-1 rounded leading-normal">
                        {skill.abilityCode}
                      </span>
                    </div>
                    {skill.source && (
                      <span className="block text-[9px] text-amber-400/90 font-sans tracking-wide leading-none mt-1">
                        ✨ {skill.source}
                      </span>
                    )}
                    {isStrengthAthleticsAdvantage && (
                      <span className="block text-[9px] text-amber-500 font-extrabold uppercase tracking-widest leading-none mt-1 animate-pulse">
                        🔥 VANTAGEM CORPORAL (FÚRIA ATIVA)
                      </span>
                    )}
                  </div>
                </div>

                <div className={`font-mono text-xs font-semibold py-1 px-2.5 rounded border ${
                  skill.proficient 
                    ? 'bg-amber-950 text-amber-200 border-amber-500/30' 
                    : 'bg-gray-950 text-gray-400 border-dark-border'
                }`}>
                  {formatMod(skillModifier)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Expansion Button */}
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          style={{ minHeight: '44px' }}
          className="w-full mt-2.5 flex items-center justify-center gap-1.5 rounded-xl border border-dark-border bg-dark-panel/40 hover:bg-dark-panel text-[10px] text-gray-400 font-extrabold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer"
        >
          {showAllSkills ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Ocultar Perícias não Treinadas</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-amber-500" />
              <span>Ver todas as Perícias de D&D 5e (18)</span>
            </>
          )}
        </button>
      </div>

      {/* Recurso trackers Container */}
      <div>
        <h3 className="text-xs font-display font-semibold uppercase text-gray-400 tracking-widest mb-2.5">
          Rastreador de Recursos do Dia
        </h3>

        <div className="bg-dark-panel rounded-xl border border-dark-border p-3.5 flex flex-col gap-4">
          
          {/* Rage usages tracker (3 charges) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-amber-200 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Usos de Fúria (3/Dia)
              </span>
              <span className="text-[10px] font-mono text-gray-400">Restaurável em Descanso Longo</span>
            </div>
            
            <div className="flex gap-4">
              {state.rageSlots.map((checked, i) => (
                <button
                  key={`rage-${i}`}
                  onClick={() => handleRageSlotClick(i)}
                  className={`flex-1 h-11 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${
                    checked
                      ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow-[0_0_8px_rgba(133,77,14,0.3)]'
                      : 'bg-dark-antracite border-dark-border text-gray-500'
                  }`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="text-[10px] font-mono leading-none">Runa {i + 1}</span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider">
                    {checked ? 'ATIVADA' : 'LIVRE'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Spell slots tracker (3 charges) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Espaços de Magia (1º Nível - 3 Slots)
              </span>
              <span className="text-[10px] font-mono text-gray-400">Recuperação Arcana Disponível</span>
            </div>

            <div className="flex gap-4">
              {state.spellSlots.map((spent, i) => (
                <button
                  key={`spell-${i}`}
                  onClick={() => handleSpellSlotClick(i)}
                  className={`flex-1 h-11 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all ${
                    spent
                      ? 'bg-red-950/30 border-red-900/60 text-red-400 font-bold'
                      : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                  }`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="text-[10px] font-mono leading-none">Slot {i + 1}</span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider leading-none">
                    {spent ? 'GASTO 🔴' : 'PRONTO 🔮'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Arcane Recovery Section (Recuperação Arcana) */}
          <div className="border-t border-dark-border pt-3.5 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="text-left w-full sm:w-auto">
              <p className="text-xs font-bold text-teal-300 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-teal-400" /> Recuperação Arcana (1x/Dia)
              </p>
              <p className="text-[10px] text-gray-400 font-sans leading-tight mt-0.5">
                Recupere 1 slot de Magia de 1º círculo ao fazer um descanso curto.
              </p>
            </div>

            <button
              id="btn-arcane-recovery"
              onClick={handleArcaneRecovery}
              disabled={state.arcaneRecoveryUsed}
              style={{ minHeight: '44px' }}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                state.arcaneRecoveryUsed
                  ? 'bg-gray-900 border border-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-950/50 hover:bg-teal-900 border border-teal-500/50 text-teal-200 active:scale-95'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {state.arcaneRecoveryUsed ? 'JÁ EXECUTADO' : 'RECUPERAR 1 SLOT'}
            </button>
          </div>
        </div>
      </div>

      {/* Long Rest Master Reset Button */}
      <div className="mt-2 text-center">
        {!showConfirmLongRest ? (
          <button
            onClick={() => setShowConfirmLongRest(true)}
            style={{ minHeight: '44px', minWidth: '150px' }}
            className="px-5 py-2.5 bg-dark-panel hover:bg-red-950/20 text-gray-300 hover:text-red-300 border border-dark-border hover:border-red-950 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2.5 mx-auto transition-all duration-300 active:scale-95 shadow-md"
          >
            <RefreshCcw className="w-4 h-4 text-amber-500" />
            <span>REALIZAR DESCANSO LONGO</span>
          </button>
        ) : (
          <div className="bg-dark-panel p-4 border border-amber-500/40 rounded-xl max-w-sm mx-auto flex flex-col gap-2.5 animate-fade-in shadow-lg">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5 leading-none">
              <RefreshCcw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              Confirmar Descanso Longo?
            </p>
            <p className="text-[10px] text-gray-400 leading-snug">
              Isso restaurará todos os seus PVs (44), desativará fúrias ou efeitos e recuperará todos os seus espaços de magia e usos de Fúria.
            </p>
            <div className="flex gap-2 justify-center mt-1">
              <button
                onClick={() => setShowConfirmLongRest(false)}
                className="px-4 py-2 bg-dark-border hover:bg-gray-800 text-gray-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={{ minHeight: '38px', minWidth: '85px' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onLongRest();
                  setShowConfirmLongRest(false);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-dark-antracite rounded-lg text-xs font-black transition-all cursor-pointer"
                style={{ minHeight: '38px', minWidth: '85px' }}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
