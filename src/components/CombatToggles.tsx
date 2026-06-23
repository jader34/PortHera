import React from 'react';
import { Flame, Swords, ShieldAlert, Zap } from 'lucide-react';
import { CharacterState } from '../types';

interface CombatTogglesProps {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

export default function CombatToggles({ state, setState }: CombatTogglesProps) {
  const toggleRage = () => {
    setState(prev => {
      const nextRage = !prev.isRageActive;
      // If Rage is activated, check off one Rage slot if we still have available ones!
      let updatedRageSlots = [...prev.rageSlots];
      if (nextRage) {
        const availableIndex = updatedRageSlots.indexOf(false);
        if (availableIndex !== -1) {
          updatedRageSlots[availableIndex] = true;
        }
      }
      return {
        ...prev,
        isRageActive: nextRage,
        rageSlots: updatedRageSlots,
      };
    });
  };

  const toggleReckless = () => {
    setState(prev => ({
      ...prev,
      isRecklessActive: !prev.isRecklessActive,
    }));
  };

  return (
    <div className="px-4 py-3 flex flex-col gap-2.5">
      <div className="flex gap-2">
        {/* Rage Toggle Button */}
        <button
          id="btn-toggle-rage"
          onClick={toggleRage}
          className={`flex-1 flex items-center justify-between px-3 py-3 rounded-xl border transition-all duration-300 ${
            state.isRageActive
              ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-[0_0_15px_rgba(131,77,14,0.4)]'
              : 'bg-dark-panel border-dark-border text-gray-400 hover:border-gray-800'
          }`}
          style={{ minHeight: '48px' }}
        >
          <div className="flex items-center gap-2">
            <Flame className={`w-5 h-5 ${state.isRageActive ? 'text-amber-500 animate-pulse' : 'text-gray-500'}`} />
            <div className="text-left">
              <span className="block text-[11px] font-sans font-extrabold uppercase tracking-widest text-gray-500 leading-none">
                Estado Físico
              </span>
              <span className="text-xs font-display font-black uppercase text-gray-200">
                {state.isRageActive ? 'Fúria Ativa!' : 'Entrar em Fúria'}
              </span>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            state.isRageActive ? 'bg-amber-500 border-amber-400 text-dark-antracite' : 'border-gray-600'
          }`}>
            {state.isRageActive && <Zap className="w-3.5 h-3.5 fill-current" />}
          </div>
        </button>

        {/* Reckless Attack Toggle Button */}
        <button
          id="btn-toggle-reckless"
          onClick={toggleReckless}
          className={`flex-1 flex items-center justify-between px-3 py-3 rounded-xl border transition-all duration-300 ${
            state.isRecklessActive
              ? 'bg-red-950/40 border-red-500/85 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
              : 'bg-dark-panel border-dark-border text-gray-400 hover:border-gray-800'
          }`}
          style={{ minHeight: '48px' }}
        >
          <div className="flex items-center gap-2">
            <Swords className={`w-5 h-5 ${state.isRecklessActive ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
            <div className="text-left">
              <span className="block text-[11px] font-sans font-extrabold uppercase tracking-widest text-gray-500 leading-none">
                Estilo Móvel
              </span>
              <span className="text-xs font-display font-black uppercase text-gray-200">
                {state.isRecklessActive ? 'At. Imprudente' : 'At. Imprudente'}
              </span>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            state.isRecklessActive ? 'bg-red-600 border-red-400 text-white' : 'border-gray-600'
          }`}>
            {state.isRecklessActive && <span className="text-[10px] font-bold">V</span>}
          </div>
        </button>
      </div>

      {/* Reckless state alerts and notes */}
      {state.isRecklessActive && (
        <div className="bg-red-950/30 border border-red-900/60 rounded-xl p-3 flex gap-2.5 items-start">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold text-emerald-400">
              ⚡ Vantagem nos Ataques:
            </p>
            <p className="text-gray-300 leading-tight">
              Suas jogadas de ataque corpo-a-corpo usando Força têm <strong className="text-emerald-400">Vantagem</strong> neste turno.
            </p>
            <p className="font-semibold text-red-400 mt-1.5 flex items-center gap-1">
              ⚠️ Risco Elevado:
            </p>
            <p className="text-red-300/90 leading-tight font-sans">
              As jogadas de ataque de inimigos contra você têm <strong className="text-red-400">Vantagem</strong> até o início do seu próximo turno!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
