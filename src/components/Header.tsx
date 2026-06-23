import React, { useState } from 'react';
import { Shield, Flame, Heart, Sparkles, UserCheck } from 'lucide-react';
import { CharacterState } from '../types';
import { CHARACTER_INFO } from '../data';

interface HeaderProps {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  onApplyDamage: (amount: number) => void;
  onHeal: (amount: number) => void;
  onAddTempHp: (amount: number) => void;
}

export default function Header({
  state,
  setState,
  onApplyDamage,
  onHeal,
  onAddTempHp,
}: HeaderProps) {
  const [dmgInput, setDmgInput] = useState<string>('');
  const [healInput, setHealInput] = useState<string>('');
  const [tempInput, setTempInput] = useState<string>('');
  const [showHpPanel, setShowHpPanel] = useState<boolean>(false);

  const toggleDeflection = () => {
    setState(prev => ({
      ...prev,
      isDeflectionActive: !prev.isDeflectionActive,
    }));
  };

  const handleApplyDmg = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(dmgInput, 10);
    if (!isNaN(val) && val > 0) {
      onApplyDamage(val);
      setDmgInput('');
    }
  };

  const handleApplyHeal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(healInput, 10);
    if (!isNaN(val) && val > 0) {
      onHeal(val);
      setHealInput('');
    }
  };

  const handleApplyTemp = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(tempInput, 10);
    if (!isNaN(val) && val >= 0) {
      onAddTempHp(val);
      setTempInput('');
    }
  };

  const calculatedAc = state.isDeflectionActive 
    ? CHARACTER_INFO.baseAc + 2 
    : CHARACTER_INFO.baseAc;

  // Visual percentages for health bars
  const hpPercent = Math.min(100, Math.max(0, (state.hp / CHARACTER_INFO.maxHp) * 100));

  return (
    <header className="sticky top-0 z-30 w-full bg-dark-antracite/95 border-b border-dark-border backdrop-blur-md px-4 py-3 shadow-lg select-none">
      {/* Basic Hero Row */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="font-display font-bold text-lg text-amber-200 tracking-wide uppercase">
              {CHARACTER_INFO.name}
            </h1>
          </div>
          <p className="text-[11px] font-mono text-gray-400 leading-tight">
            {CHARACTER_INFO.classLevel}
          </p>
          <div className="flex gap-2 mt-0.5 items-center">
            <span className="text-[10px] font-semibold py-0.5 px-1.5 rounded bg-amber-950/40 text-amber-500/90 border border-amber-900/30">
              {CHARACTER_INFO.race}
            </span>
            <span className="text-[10px] font-semibold py-0.5 px-1.5 rounded bg-cyan-950/40 text-cyan-400/90 border border-cyan-900/30">
              War Magic + Bear Totem
            </span>
          </div>
        </div>

        {/* Armor Class Tactile Element */}
        <button
          id="btn-toggle-deflection"
          onClick={toggleDeflection}
          className={`relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 min-w-[62px] min-h-[52px] ${
            state.isDeflectionActive
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'bg-dark-panel border-dark-border text-gray-300 hover:border-gray-700'
          }`}
          style={{ minWidth: '64px', minHeight: '52px' }}
          title="Alternar Deflexão Arcana (+2 CA)"
        >
          <Shield className={`w-4 h-4 mb-0.5 ${state.isDeflectionActive ? 'animate-pulse text-cyan-300' : 'text-gray-500'}`} />
          <div className="flex items-baseline gap-0.5 leading-none">
            <span className="text-xl font-mono font-bold">{calculatedAc}</span>
            <span className="text-[9px] font-sans font-medium text-gray-400">CA</span>
          </div>
          {state.isDeflectionActive && (
            <span className="absolute -top-1.5 -right-1 text-[8px] tracking-wide bg-cyan-400 text-dark-antracite font-bold font-sans uppercase px-1 rounded-full animate-bounce">
              +2 CA
            </span>
          )}
        </button>
      </div>

      {/* HP Visual bar & Controls */}
      <div className="mt-3 bg-dark-panel/90 rounded-xl p-3 border border-dark-border">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1.5">
            <Heart className={`w-4 h-4 ${state.hp < 15 ? 'text-red-500 animate-pulse' : 'text-red-400'}`} />
            <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">Pontos de Vida</span>
          </div>
          
          <div className="flex items-baseline gap-1 font-mono">
            {state.tempHp > 0 && (
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-900/30">
                +{state.tempHp} PV Temp
              </span>
            )}
            <span className="text-lg font-extrabold text-white">{state.hp}</span>
            <span className="text-xs text-gray-500">/</span>
            <span className="text-xs text-gray-400">{CHARACTER_INFO.maxHp}</span>
          </div>
        </div>

        {/* Dynamic bar containing Temp Hp overlay optionally */}
        <div className="relative w-full h-3 bg-gray-950 rounded-full overflow-hidden border border-dark-border">
          {/* Real HP Fill */}
          <div
            className={`h-full transition-all duration-300 ease-out rounded-full ${
              state.hp < 15 ? 'bg-red-600' : 'bg-emerald-600'
            }`}
            style={{ width: `${hpPercent}%` }}
          />
          {/* Temp HP Outline/Fill visual glow indicator */}
          {state.tempHp > 0 && (
            <div
              className="absolute top-0 right-0 h-full bg-cyan-400/30 border-l border-r border-cyan-300/60 animate-pulse"
              style={{ width: `${Math.min(100, (state.tempHp / CHARACTER_INFO.maxHp) * 100)}%`, right: 0 }}
            />
          )}
        </div>

        {/* Direct modification panel toggle / buttons */}
        <div className="flex justify-between items-center mt-3 gap-2">
          {/* Quick 1hp increments to support minor changes or corrections */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setState(p => ({ ...p, hp: Math.max(0, p.hp - 1) }))}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-border text-gray-300 active:bg-gray-800 transition-colors text-sm font-bold border border-gray-800"
              title="Diminuir 1 PV"
            >
              -1
            </button>
            <button
              onClick={() => setState(p => ({ ...p, hp: Math.min(CHARACTER_INFO.maxHp, p.hp + 1) }))}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-border text-gray-300 active:bg-gray-800 transition-colors text-sm font-bold border border-gray-800"
              title="Aumentar 1 PV"
            >
              +1
            </button>
          </div>

          {/* Quick Toggle Panel for exact values */}
          <button
            onClick={() => setShowHpPanel(!showHpPanel)}
            className="flex-1 max-w-[124px] h-10 flex items-center justify-center gap-1 rounded-lg bg-amber-950/20 hover:bg-amber-950/40 text-amber-400 border border-amber-900/40 transition-colors text-xs font-semibold leading-none px-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] uppercase tracking-wide">Dano/Cura</span>
          </button>

          {/* Preset Temp HP modifiers */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setState(p => ({ ...p, tempHp: Math.max(0, p.tempHp - 1) }))}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-border text-cyan-400 bg-cyan-950/10 active:bg-cyan-950/30 transition-colors text-sm font-bold border border-cyan-950"
              title="Diminuir 1 PV Temp"
            >
              -T
            </button>
            <button
              onClick={() => setState(p => ({ ...p, tempHp: p.tempHp + 5 }))}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-border text-cyan-400 bg-cyan-950/10 active:bg-cyan-950/30 transition-colors text-xs font-bold border border-cyan-950"
              title="Aumentar 5 PV Temp"
            >
              +5T
            </button>
          </div>
        </div>

        {/* Math input calculator that applies DAMAGE properly following rule:
            Temp HP is consumed first before real HP! */}
        {showHpPanel && (
          <div className="mt-3 p-3 bg-dark-antracite/90 rounded-lg border border-dark-border flex flex-col gap-2.5">
            <div className="text-[11px] font-sans font-bold text-gray-400 uppercase tracking-wide border-b border-dark-border pb-1">
              Painel de Cálculo de HP
            </div>

            {/* Damage row */}
            <form onSubmit={handleApplyDmg} className="flex gap-2 items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-red-400 w-16">DANO:</span>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Ex: 10"
                value={dmgInput}
                onChange={e => setDmgInput(e.target.value)}
                className="flex-1 max-w-[80px] bg-dark-antracite border border-red-900/60 rounded px-2 py-1 text-center font-mono text-sm text-red-200 outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-950/70 hover:bg-red-900 text-red-200 text-xs font-bold py-1.5 px-3 rounded border border-red-800 transition-colors"
                style={{ minHeight: '32px' }}
              >
                Aplicar
              </button>
            </form>

            {/* Cure row */}
            <form onSubmit={handleApplyHeal} className="flex gap-2 items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-emerald-400 w-16">CURA:</span>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Ex: 8"
                value={healInput}
                onChange={e => setHealInput(e.target.value)}
                className="flex-1 max-w-[80px] bg-dark-antracite border border-emerald-900/60 rounded px-2 py-1 text-center font-mono text-sm text-emerald-200 outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 text-xs font-bold py-1.5 px-3 rounded border border-emerald-800 transition-colors"
                style={{ minHeight: '32px' }}
              >
                Aplicar
              </button>
            </form>

            {/* Custom Temp HP row */}
            <form onSubmit={handleApplyTemp} className="flex gap-2 items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-cyan-400 w-16">PV TEMP:</span>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Ex: 6"
                value={tempInput}
                onChange={e => setTempInput(e.target.value)}
                className="flex-1 max-w-[80px] bg-dark-antracite border border-cyan-900/60 rounded px-2 py-1 text-center font-mono text-sm text-cyan-200 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="bg-cyan-950/70 hover:bg-cyan-900 text-cyan-200 text-xs font-bold py-1.5 px-3 rounded border border-cyan-800 transition-colors"
                style={{ minHeight: '32px' }}
              >
                Definir
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
