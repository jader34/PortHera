import React, { useState } from 'react';
import { Sparkles, HelpCircle, Lock, Play, Volume2, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { CharacterState, Spell } from '../types';
import { SPELLS, CHARACTER_INFO } from '../data';

interface GrimoireTabProps {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  onAddTempHp: (amount: number) => void;
}

export default function GrimoireTab({ state, setState, onAddTempHp }: GrimoireTabProps) {
  const [filter, setFilter] = useState<'all' | 'prepared' | 'rituals'>('all');
  const [openSpellId, setOpenSpellId] = useState<string | null>(null);

  const toggleSpellAccordion = (id: string) => {
    setOpenSpellId(openSpellId === id ? null : id);
  };

  // Toggle Longstrider active state
  const handleToggleLongstrider = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState(prev => ({
      ...prev,
      longstriderActive: !prev.longstriderActive,
    }));
  };

  // Filter spells accordingly
  const filteredSpells = SPELLS.filter(spell => {
    if (filter === 'prepared') return spell.type === 'prepared' || spell.type === 'cantrip';
    if (filter === 'rituals') return spell.type === 'ritual';
    return true; // "all"
  });

  return (
    <div className="px-4 pb-20 flex flex-col gap-4 select-none animate-fade-in">
      
      {/* Filter row */}
      <div className="flex gap-2 bg-dark-panel p-1 rounded-xl border border-dark-border">
        {(['all', 'prepared', 'rituals'] as const).map((opt) => {
          const label = opt === 'all' ? 'Todos' : opt === 'prepared' ? 'Preparadas/Cantrips' : 'Rituais';
          return (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              style={{ minHeight: '38px' }}
              className={`flex-1 text-center text-xs font-bold py-2 rounded-lg transition-all ${
                filter === opt
                  ? 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-200'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Rage Lock Warning Banner */}
      {state.isRageActive && (
        <div className="bg-amber-950/20 border border-amber-500/45 rounded-xl p-3 flex gap-2.5 items-start">
          <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs">
            <p className="font-extrabold text-amber-400 uppercase tracking-wide">
              Fúria Ativa - Bloqueio de Magia:
            </p>
            <p className="text-gray-300 leading-snug">
              Você não pode conjurar magias normais ou manter concentração enquanto estiver em fúria. As magias preparadas e truques estão <strong className="text-amber-500">Bloqueados</strong> para conjuração.
            </p>
            <p className="text-[10px] text-cyan-400 mt-1">
              *Nota: Efeitos pré-conjurados (como Vida Falsa e Passos Longos) continuam ativos!
            </p>
          </div>
        </div>
      )}

      {/* Spells list Accordion */}
      <div className="flex flex-col gap-2">
        {filteredSpells.map((spell) => {
          const isOpen = openSpellId === spell.id;
          const isCantrip = spell.level === 0;
          const isRitual = spell.type === 'ritual';
          const isUnprepared = spell.type === 'unprepared';
          
          // Determine if this spell must be locked due to Rage active
          const isLockedByRage = state.isRageActive && spell.notInRage;

          return (
            <div
              key={spell.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'bg-dark-panel/95 shadow-md' : 'bg-dark-panel border-dark-border'
              } ${isLockedByRage ? 'opacity-55 border-amber-900/30 bg-gray-900/40 relative' : isOpen ? 'border-cyan-550/30 border' : 'border-dark-border'}`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleSpellAccordion(spell.id)}
                style={{ minHeight: '52px' }}
                className="px-4 py-3 flex items-center justify-between cursor-pointer active:bg-gray-800/50"
              >
                <div className="flex items-center gap-2.5">
                  {/* Aspect Identifier Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    isCantrip
                      ? 'bg-amber-950/20 border-amber-900/30 text-amber-500'
                      : isRitual
                      ? 'bg-teal-950/20 border-teal-900/30 text-teal-400'
                      : isUnprepared
                      ? 'bg-slate-950/40 border-slate-800/40 text-gray-500'
                      : 'bg-cyan-950/20 border-cyan-900/30 text-cyan-400'
                  }`}>
                    {isCantrip ? (
                      <span className="text-[10px] font-mono font-black">CAN</span>
                    ) : isRitual ? (
                      <span className="text-[10px] font-mono font-black">RIT</span>
                    ) : isUnprepared ? (
                      <span className="text-[10px] font-mono font-black">GRM</span>
                    ) : (
                      <span className="text-[10px] font-mono font-black">PRE</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <h4 className="font-display font-semibold text-sm text-white">
                        {spell.namePt}
                      </h4>
                      <span className="text-[9px] font-mono text-gray-550 font-medium">
                        {spell.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 leading-none block mt-1">
                      {isCantrip ? 'Truque' : isRitual ? 'Ritual' : isUnprepared ? 'No Grimório (Não Preparada)' : '1º Círculo'} • <span className="text-cyan-400 font-semibold uppercase text-[9px]">{spell.castingTime}</span>
                    </span>
                  </div>
                </div>

                {/* Right side interaction indicator/badges */}
                <div className="flex items-center gap-2">
                  {/* Status indicators like Active Longstrider */}
                  {spell.id === 'longstrider' && state.longstriderActive && (
                    <span className="bg-cyan-500 text-dark-antracite text-[9px] font-sans font-bold py-0.5 px-2 rounded-full uppercase tracking-wider animate-pulse">
                      ATIVO (+3m)
                    </span>
                  )}

                  {/* Lock Indicator or Roll Indicator */}
                  {isLockedByRage ? (
                    <span className="flex items-center gap-1 text-[9px] font-mono bg-amber-950/40 text-amber-500 border border-amber-900/40 py-0.5 px-2 rounded-full">
                      <Lock className="w-2.5 h-2.5" /> BLOQUEADO
                    </span>
                  ) : isUnprepared ? (
                    <span className="flex items-center gap-1 text-[9px] font-mono bg-slate-900 border border-slate-800 text-gray-400 py-0.5 px-2 rounded-full uppercase tracking-wider">
                      Não Preparada
                    </span>
                  ) : spell.id === 'longstrider' ? (
                    <button
                      onClick={handleToggleLongstrider}
                      style={{ minHeight: '30px' }}
                      className={`px-2.5 py-1 font-black rounded-lg text-[10px] uppercase flex items-center gap-1 transition-all ${
                        state.longstriderActive
                          ? 'bg-red-950 border border-red-500/40 text-red-300'
                          : 'bg-cyan-950 border border-cyan-500/40 text-cyan-300'
                      }`}
                    >
                      {state.longstriderActive ? 'DESATIVAR' : 'ATIVAR'}
                    </button>
                  ) : null}

                  {/* Collapsed indicator */}
                  <span className={`text-gray-500 text-xs font-mono transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                </div>
              </div>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-dark-border/40 bg-dark-antracite/30">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-b border-dark-border/45 pb-2 mb-2.5 text-[10px] font-mono text-gray-400">
                    <div>Conjuração: <strong className="text-cyan-400 font-bold">{spell.castingTime}</strong></div>
                    <div>Alcance: <strong className="text-gray-300">{spell.range}</strong></div>
                    <div>Duração: <strong className="text-gray-300">{spell.duration}</strong></div>
                    <div>Componentes: <strong className="text-gray-300">{spell.components}</strong></div>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {spell.description}
                  </p>

                  {/* Special spell alerts or mechanics notes */}
                  {spell.id === 'find_familiar' && (
                    <div className="mt-3 p-2.5 bg-teal-950/15 border border-teal-900/30 rounded-xl leading-relaxed text-[11px] text-teal-300/90 font-sans">
                      💡 <strong>Estratégia Mecânica:</strong> Evoque seu familiar coruja do espaço rúnico para sobrevoar o inimigo. No combate, ela executa a ação <strong>Ajudar</strong> e sai de perto (graças ao talento Acrobata / Flyby). Isso garante <strong>VANTAGEM</strong> em seu ataque principal à distância de braço sem sofrer ataques de oportunidade!
                    </div>
                  )}

                  {spell.id === 'booming_blade' && (
                    <div className="mt-3 p-2.5 bg-amber-950/15 border border-amber-900/30 rounded-xl leading-relaxed text-[11px] text-amber-300/90 font-sans">
                      ⚔️ <strong>Sinergia Multiclasse:</strong> Ideal para prender inimigos no lugar. Se for atingido, o alvo rúnico se move e sofre dano trovejante adicional. (Lembre-se: não pode ser usado junto com Fúria pois exige concentração física de conjuração!).
                    </div>
                  )}

                  {spell.id === 'mind_sliver' && (
                    <div className="mt-3 p-2.5 bg-amber-950/15 border border-amber-900/30 rounded-xl leading-relaxed text-[11px] text-amber-300/90 font-sans">
                      🧠 <strong>Debuff Arcano:</strong> Perfeito para preparar suas jogadas ou ajudar o grupo. O redutor de 1d4 na próxima salvaguarda do oponente facilita que sofram mais impactos de outras magias. (Dano Base Int CD 12).
                    </div>
                  )}

                  {isLockedByRage && (
                    <div className="mt-2 text-[10px] text-amber-500 font-sans font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Impedido de conjurar ou se concentrar por estar em Fúria!
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
