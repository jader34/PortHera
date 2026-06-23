import { Swords, Flame, ChevronRight, Shield, Star } from 'lucide-react';
import { CharacterState } from '../types';

interface CombatTabProps {
  state: CharacterState;
}

export default function CombatTab({ state }: CombatTabProps) {
  // Rage damage bonus calculation (+3 base, +5 if rage is active)
  const damageBonusText = state.isRageActive ? "+ 5" : "+ 3";
  const damageBonusDetail = state.isRageActive ? "(+3 Base + 2 Fúria)" : "(+3 Força)";

  return (
    <div className="px-4 pb-20 flex flex-col gap-4 select-none animate-fade-in">

      {/* Advantage Banner inside tab if Reckless is active */}
      {state.isRecklessActive && (
        <div className="bg-emerald-950/20 border border-emerald-500/50 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <p>
            🔥 <strong>Ataque Imprudente Ativado:</strong> Você tem <strong>Vantagem</strong> em todas as jogadas de ataque corpo-a-corpo baseadas em Força!
          </p>
        </div>
      )}

      {/* Main Attack Card */}
      <div className="bg-dark-panel border border-dark-border rounded-2xl overflow-hidden shadow-md">
        <div className="bg-amber-950/10 border-b border-dark-border px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-500" />
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-amber-200">
              Ataque Principal
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-amber-950/40 text-amber-400 border border-amber-900/40 py-0.5 px-2 rounded-full font-bold uppercase">
            Ação
          </span>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-display font-semibold text-lg text-white leading-tight">
                Bordão (Quarterstaff)
              </h4>
              <p className="text-[10px] font-mono text-gray-400 mb-1">
                Uma Mão + Escudo (Estilo Primal)
              </p>
            </div>

            {/* Hit Bonus Badge */}
            <div className="text-center bg-gray-950 border border-dark-border py-1 px-3 rounded-lg min-w-[60px]">
              <span className="block text-[8px] font-sans font-bold text-gray-500 uppercase tracking-widest leading-none mb-0.5">Acerto</span>
              <span className="text-base font-mono font-black text-amber-400">+6</span>
            </div>
          </div>

          <div className="bg-dark-antracite/60 rounded-xl p-3 border border-dark-border flex justify-between items-center gap-3">
            <div className="text-left">
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block leading-none">Tipo de Dano</span>
              <span className="text-xs font-semibold text-gray-300">Concussivo</span>
            </div>

            <div className="text-right">
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block leading-none">Dano Físico</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg font-mono font-extrabold ${state.isRageActive ? 'text-amber-400 font-black' : 'text-white'}`}>
                  1d6 {damageBonusText}
                </span>
                <span className="text-[9px] text-gray-400 font-sans">{damageBonusDetail}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-2.5 leading-tight font-sans">
            Com empunhadura rúnica de couro, você golpeia com firmeza primitiva.
          </p>
        </div>
      </div>

      {/* Bonus Action Attack Card (Polearm Master) */}
      <div className="bg-dark-panel border border-dark-border rounded-2xl overflow-hidden shadow-md">
        <div className="bg-amber-950/10 border-b border-dark-border px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-amber-300">
              Ação Bônus (Mestre de Armas)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-amber-950/40 text-amber-300 border border-amber-900/40 py-0.5 px-2 rounded-full font-bold uppercase">
            Ação Bônus
          </span>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-display font-semibold text-lg text-white leading-tight">
                Cabo do Bordão (Butt End)
              </h4>
              <p className="text-[10px] font-mono text-gray-400 mb-1">
                Requisito: Ter atacado com o Bordão primeiro
              </p>
            </div>

            {/* Hit Bonus Badge */}
            <div className="text-center bg-gray-950 border border-dark-border py-1 px-3 rounded-lg min-w-[60px]">
              <span className="block text-[8px] font-sans font-bold text-gray-500 uppercase tracking-widest leading-none mb-0.5">Acerto</span>
              <span className="text-base font-mono font-black text-amber-400">+6</span>
            </div>
          </div>

          <div className="bg-dark-antracite/60 rounded-xl p-3 border border-dark-border flex justify-between items-center gap-3">
            <div className="text-left">
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block leading-none">Tipo de Dano</span>
              <span className="text-xs font-semibold text-gray-300">Concussivo</span>
            </div>

            <div className="text-right">
              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block leading-none">Dano Físico</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg font-mono font-extrabold ${state.isRageActive ? 'text-amber-400' : 'text-white'}`}>
                  1d4 {damageBonusText}
                </span>
                <span className="text-[9px] text-gray-400 font-sans">{damageBonusDetail}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-2.5 leading-tight font-sans">
            Gire a haste rúnica para desferir um rápido contra-ataque usando a extremidade cega oposta (Polearm Master).
          </p>
        </div>
      </div>

      {/* Reaction Habilitiy Info Card (Deflexão Arcana) */}
      <div className="bg-dark-panel border border-dark-border rounded-2xl overflow-hidden shadow-md">
        <div className="bg-cyan-950/20 border-b border-dark-border px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-black text-xs uppercase tracking-wider text-cyan-200">
              Reação de Magia de Guerra
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-900/40 py-0.5 px-2 rounded-full font-bold uppercase">
            Reação
          </span>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-display font-semibold text-lg text-cyan-300 leading-none">
                Deflexão Arcana (War Deflection)
              </h4>
              <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-wide">
                Origem: War Wizard Level 2 (Ilimitado)
              </p>
            </div>
          </div>

          {/* Quick Stats Grid for Reaction */}
          <div className="grid grid-cols-2 gap-2 my-3">
            <div className="bg-gray-950 border border-dark-border p-2 rounded-xl text-center">
              <span className="block text-[8px] font-sans font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Na Defesa</span>
              <span className="text-sm font-mono font-extrabold text-cyan-300">+2 para CA</span>
            </div>
            <div className="bg-gray-950 border border-dark-border p-2 rounded-xl text-center">
              <span className="block text-[8px] font-sans font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Nos Testes</span>
              <span className="text-sm font-mono font-extrabold text-teal-300">+4 nas Saves</span>
            </div>
          </div>

          <div className="bg-amber-950/10 border border-amber-900/40 rounded-xl p-3 flex gap-2 items-start mt-2">
            <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="text-amber-100 font-bold leading-normal">
                Restrição Importante:
              </p>
              <p className="text-gray-300 leading-snug font-sans mt-0.5">
                Ao usar esta reação, você <strong className="text-amber-400">só poderá conjurar truques (cantrips)</strong> até o final do seu próximo turno. (Você não pode invocar magias de 1º círculo ou superiores!).
              </p>
              <p className="text-[10px] text-gray-400 leading-snug mt-1 border-t border-amber-900/20 pt-1">
                *Nota: Esta é uma característica física/arcana, portanto <strong className="text-cyan-400">funciona livremente mesmo sob os efeitos da Fúria</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
