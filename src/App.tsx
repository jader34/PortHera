/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserCheck, Swords, Sparkles, BookOpen, RotateCcw, ShieldCheck, Flame, BookText } from 'lucide-react';
import { CharacterState } from './types';
import { CHARACTER_INFO } from './data';
import Header from './components/Header';
import CombatToggles from './components/CombatToggles';
import StatusTab from './components/StatusTab';
import CombatTab from './components/CombatTab';
import GrimoireTab from './components/GrimoireTab';
import LoreTab from './components/LoreTab';

const LOCAL_STORAGE_KEY = 'portador_da_heranca_ficha_state_v1';

const DEFAULT_STATE: CharacterState = {
  hp: CHARACTER_INFO.maxHp,
  tempHp: 0,
  isRageActive: false,
  isRecklessActive: false,
  isDeflectionActive: false,
  rageSlots: [false, false, false], // false means unused, true means used
  spellSlots: [false, false, false], // false means unused, true means spent
  arcaneRecoveryUsed: false,
  longstriderActive: false,
};

export default function App() {
  const [state, setState] = useState<CharacterState>(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState<'status' | 'combat' | 'grimoire' | 'lore'>('status');
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure values exist in case of schema updates
        setState({
          ...DEFAULT_STATE,
          ...parsed,
        });
      }
    } catch (err) {
      console.error('Erro ao ler estado do LocalStorage:', err);
    } finally {
      setDataLoaded(true);
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    if (dataLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        console.error('Erro ao salvar estado no LocalStorage:', err);
      }
    }
  }, [state, dataLoaded]);

  // Master damage function: first consumes Temp HP, then real HP
  const handleApplyDamage = (amount: number) => {
    setState(prev => {
      let currentTemp = prev.tempHp;
      let currentHp = prev.hp;

      if (currentTemp > 0) {
        if (amount <= currentTemp) {
          currentTemp -= amount;
        } else {
          const leftover = amount - currentTemp;
          currentTemp = 0;
          currentHp = Math.max(0, currentHp - leftover);
        }
      } else {
        currentHp = Math.max(0, currentHp - amount);
      }

      return {
        ...prev,
        hp: currentHp,
        tempHp: currentTemp,
      };
    });
  };

  // Master healing function: adds to real HP, up to maximum (44)
  const handleHeal = (amount: number) => {
    setState(prev => ({
      ...prev,
      hp: Math.min(CHARACTER_INFO.maxHp, prev.hp + amount),
    }));
  };

  // Master Temp HP function: sets or adds temporary hit points
  const handleAddTempHp = (amount: number) => {
    setState(prev => ({
      ...prev,
      tempHp: amount, // temporary HP usually replaces previous, doesn't stack in 5e rules
    }));
  };

  // Long Rest Master Reset handler: restores hp to max, resets slots
  const handleLongRest = () => {
    setState({
      hp: CHARACTER_INFO.maxHp,
      tempHp: 0,
      isRageActive: false,
      isRecklessActive: false,
      isDeflectionActive: false,
      rageSlots: [false, false, false],
      spellSlots: [false, false, false],
      arcaneRecoveryUsed: false,
      longstriderActive: false,
    });
  };

  // Safe speed calculation: Base movespeed is 9m. If Longstrider is active, movespeed is 12m (+3m).
  const currentSpeed = state.longstriderActive 
    ? CHARACTER_INFO.speedBase + 3 
    : CHARACTER_INFO.speedBase;

  return (
    <div className="min-h-screen bg-dark-antracite text-gray-200 font-sans flex flex-col relative pb-20">
      
      {/* Sticky Header component with Life/CA Management */}
      <Header
        state={state}
        setState={setState}
        onApplyDamage={handleApplyDamage}
        onHeal={handleHeal}
        onAddTempHp={handleAddTempHp}
      />

      {/* Global State Toggles (Persistent below the Header) */}
      <CombatToggles state={state} setState={setState} />

      {/* Speed & Passives Miniature Ribbon */}
      <div className="px-4 py-1.5 flex gap-3 text-[10px] font-mono text-gray-400 bg-gray-950/40 border-y border-dark-border/40 select-none items-center justify-between">
        <div className="flex gap-4">
          <div>
            DESLOCAMENTO:{' '}
            <strong className={state.longstriderActive ? 'text-cyan-400 font-bold' : 'text-gray-300'}>
              {currentSpeed}m
            </strong>
          </div>
          <div>
            SAB. PASSIVA:{' '}
            <strong className="text-gray-300">{CHARACTER_INFO.passiveWisdom}</strong>
          </div>
          <div>
            CD TR MAGIA:{' '}
            <strong className="text-cyan-300 font-bold">{CHARACTER_INFO.spellDc}</strong>
          </div>
        </div>
        
        {/* Active States quick summary */}
        <div className="flex gap-1.5">
          {state.isRageActive && (
            <span className="shrink-0 w-2 h-2 rounded-full bg-amber-500 animate-ping" title="Fúria Ativa" />
          )}
          {state.isRecklessActive && (
            <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" title="Ataque Imprudente" />
          )}
          {state.isDeflectionActive && (
            <span className="shrink-0 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="Deflexão Ativa" />
          )}
        </div>
      </div>

      {/* Content scroll container based on Active Tab */}
      <main className="flex-1 overflow-x-hidden pt-4">
        {activeTab === 'status' && (
          <StatusTab 
            state={state} 
            setState={setState} 
            onLongRest={handleLongRest} 
          />
        )}
        {activeTab === 'combat' && (
          <CombatTab 
            state={state} 
          />
        )}
        {activeTab === 'grimoire' && (
          <GrimoireTab 
            state={state} 
            setState={setState} 
            onAddTempHp={handleAddTempHp} 
          />
        )}
        {activeTab === 'lore' && (
          <LoreTab />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar - Minimum 44x44px Touch Targets */}
      <nav 
        id="bottom-navbar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-dark-panel/95 border-t border-dark-border backdrop-blur-md flex shadow-xl select-none"
      >
        <button
          id="tab-status"
          onClick={() => setActiveTab('status')}
          style={{ height: '56px' }}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${
            activeTab === 'status' 
              ? 'text-amber-400 bg-amber-950/10 font-bold' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Ver Status e Salvaguardas"
        >
          <UserCheck className={`w-5 h-5 mb-0.5 ${activeTab === 'status' ? 'text-amber-400' : 'text-gray-500'}`} />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Status & Saves</span>
        </button>

        <button
          id="tab-combat"
          onClick={() => setActiveTab('combat')}
          style={{ height: '56px' }}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${
            activeTab === 'combat' 
              ? 'text-amber-400 bg-amber-950/10 font-bold' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Ver Ações de Ataque e Reação"
        >
          <Swords className={`w-5 h-5 mb-0.5 ${activeTab === 'combat' ? 'text-amber-400 animate-pulse' : 'text-gray-500'}`} />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Ações & Combate</span>
        </button>

        <button
          id="tab-grimoire"
          onClick={() => setActiveTab('grimoire')}
          style={{ height: '56px' }}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${
            activeTab === 'grimoire' 
              ? 'text-cyan-400 bg-cyan-950/10 font-bold' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Ver Grimório de Magias"
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${activeTab === 'grimoire' ? 'text-cyan-400 animate-pulse' : 'text-gray-500'}`} />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Grimório</span>
        </button>

        <button
          id="tab-lore"
          onClick={() => setActiveTab('lore')}
          style={{ height: '56px' }}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${
            activeTab === 'lore' 
              ? 'text-amber-400 bg-amber-950/10 font-bold' 
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Ver Inventário, Habilidades e Notas de Lore"
        >
          <BookText className={`w-5 h-5 mb-0.5 ${activeTab === 'lore' ? 'text-amber-400 animate-pulse' : 'text-gray-500'}`} />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Notas & Itens</span>
        </button>
      </nav>

    </div>
  );
}
