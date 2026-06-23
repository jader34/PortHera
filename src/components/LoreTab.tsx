import React, { useState } from 'react';
import { 
  BookOpen, 
  Scroll, 
  Backpack, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle, 
  Flame, 
  Award, 
  Eye, 
  Zap,
  Sword,
  Compass
} from 'lucide-react';

export default function LoreTab() {
  const [activeSection, setActiveSection] = useState<'narrative' | 'rules'>('narrative');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (name: string) => {
    setOpenItem(openItem === name ? null : name);
  };

  return (
    <div className="px-4 pb-20 flex flex-col gap-4 select-none animate-fade-in">
      
      {/* Subnavigation Pills */}
      <div className="flex gap-2 bg-dark-panel p-1 rounded-xl border border-dark-border">
        <button
          onClick={() => setActiveSection('narrative')}
          style={{ minHeight: '38px' }}
          className={`flex-1 text-center text-xs font-bold py-2 rounded-lg transition-all ${
            activeSection === 'narrative'
              ? 'bg-amber-950/70 border border-amber-500/30 text-amber-200'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Narrativa & Relíquias
        </button>
        <button
          onClick={() => setActiveSection('rules')}
          style={{ minHeight: '38px' }}
          className={`flex-1 text-center text-xs font-bold py-2 rounded-lg transition-all ${
            activeSection === 'rules'
              ? 'bg-cyan-950/70 border border-cyan-500/30 text-cyan-200'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Características
        </button>
      </div>

      {activeSection === 'narrative' ? (
        <div className="flex flex-col gap-4">
          
          {/* Section 1: Relíquias & Itens */}
          <div>
            <h3 className="text-xs font-display font-semibold uppercase text-gray-500 tracking-widest mb-2.5 flex items-center gap-1.5">
              <Backpack className="w-3.5 h-3.5 text-amber-500" /> Relíquias e Equipamento Primário
            </h3>

            <div className="flex flex-col gap-2.5">
              
              {/* O Bordão (O Cajado dos Selos) */}
              <div className="bg-dark-panel border border-dark-border rounded-xl overflow-hidden">
                <div 
                  onClick={() => toggleItem('bordao_selos')}
                  className="px-4 py-3 bg-dark-antracite/40 flex justify-between items-center cursor-pointer hover:bg-gray-800/40"
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-2">
                    <Sword className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-display font-bold text-amber-200">
                      O Bordão (O Cajado dos Selos)
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">
                    {openItem === 'bordao_selos' ? 'FECHAR' : 'VER ATRIBUTOS'}
                  </span>
                </div>
                {openItem === 'bordao_selos' && (
                  <div className="p-4 border-t border-dark-border bg-gray-950/30 text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-2">
                    <p>
                      Distante de ser um simples bastão de madeira de viajante, este bordão foi talhado a partir do cerne de uma árvore antiga que crescia no coração das ruínas da capital perdida. A madeira é escura, densa como ferro e polida pelo uso.
                    </p>
                    <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 text-[11px] text-amber-200/90 mt-1 flex flex-col gap-1.5">
                      <p>
                        ✨ <strong className="text-amber-400">O Detalhe Arcano:</strong> Ao longo de toda a sua extensão, os selos arcanos da civilização antiga estão entalhados profundamente na madeira. Quando você entra em combate ou conjura um truque como a <em>Lâmina Estrondosa (Booming Blade)</em>, esses sulcos brilham com uma luz azul-esverdeada pálida.
                      </p>
                      <p>
                        ⚔️ <strong className="text-amber-400">Em Combate:</strong> A ponta superior é reforçada com uma ponteira de bronze antigo (onde você canaliza os feitiços), enquanto a extremidade inferior possui uma proteção metálica desgastada — o famoso &ldquo;cabo&rdquo; que você usa para o ataque bônus do talento <strong>Mestre em Armas de Haste (Polearm Master)</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* O Escudo Guardião */}
              <div className="bg-dark-panel border border-dark-border rounded-xl overflow-hidden">
                <div 
                  onClick={() => toggleItem('escudo')}
                  className="px-4 py-3 bg-dark-antracite/40 flex justify-between items-center cursor-pointer hover:bg-gray-800/40"
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-display font-bold text-amber-200">
                      O Escudo Guardião
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">
                    {openItem === 'escudo' ? 'FECHAR' : 'VER ATRIBUTOS'}
                  </span>
                </div>
                {openItem === 'escudo' && (
                  <div className="p-4 border-t border-dark-border bg-gray-950/30 text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-2">
                    <p>
                      Um escudo redondo e pesado, feito de bronze batido e reforçado com tiras de couro de um animal caçado em sua tribo. Ele carrega as marcas de inúmeras batalhas: mossas, arranhões profundos e cicatrizes de lâminas de oponentes caídos.
                    </p>
                    <div className="bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20 text-[11px] text-cyan-200/95 mt-1">
                      🛡️ <strong className="text-cyan-400">O Detalhe Arcano:</strong> No centro do escudo, há uma grande placa de metal onde o xamã de sua tribo esculpiu o <strong>Totem do Urso</strong>. Quando você ativa a sua <em>Deflexão Arcana (Arcane Deflection)</em>, as runas ao redor do totem piscam por um milésimo de segundo, criando uma barreira de força translúcida que repele o ataque inimigo ou fortalece sua mente.
                    </div>
                  </div>
                )}
              </div>

              {/* O Familiar: "Aethel", a Coruja Espectral */}
              <div className="bg-dark-panel border border-dark-border rounded-xl overflow-hidden">
                <div 
                  onClick={() => toggleItem('familiar_aethel')}
                  className="px-4 py-3 bg-dark-antracite/40 flex justify-between items-center cursor-pointer hover:bg-gray-800/40"
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-display font-bold text-teal-200">
                      O Familiar: &ldquo;Aethel&rdquo;, a Coruja Espectral
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">
                    {openItem === 'familiar_aethel' ? 'FECHAR' : 'VER ATRIBUTOS & FICHA'}
                  </span>
                </div>
                {openItem === 'familiar_aethel' && (
                  <div className="p-4 border-t border-dark-border bg-gray-950/30 text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-3">
                    <p>
                      Convocada através do ritual milenar, esta criatura não pertence inteiramente ao mundo material. Ela assume a forma física de uma grande coruja das neves, mas seus olhos brilham com a mesma luz azul-esverdeada dos selos do seu bordão.
                    </p>
                    <div className="bg-teal-950/20 p-2.5 rounded-lg border border-teal-500/20 text-[11px] text-teal-200/90">
                      🦉 <strong className="text-teal-400">O Detalhe Arcano:</strong> Suas penas parecem levemente enevoadas nas pontas, e quando ela voa para distrair um inimigo (ação <strong>Ajudar</strong>), ela não emite som algum, deixando um breve rastro de poeira estelar ou névoa etérea no ar. Ela é o espírito de um antigo batedor enviado para guiar seus passos.
                    </div>

                    {/* D&D 5e Stat Block (Parchment Styled inside dark pane) */}
                    <div className="bg-amber-50 text-dark-antracite p-4 rounded-xl border border-amber-800 shadow-md font-sans select-text">
                      <div className="border-b border-amber-800 pb-1">
                        <h5 className="font-display font-black text-sm text-amber-900 leading-none">Aethel (Coruja Espectral)</h5>
                        <span className="text-[10px] italic text-amber-800">Besta miúda, neutro e bom (Espírito Guardião)</span>
                      </div>
                      
                      <div className="text-[11px] pt-1.5 leading-tight flex flex-col gap-0.5 text-amber-900">
                        <p><strong>Classe de Armadura:</strong> 11 (Armadura Natural)</p>
                        <p><strong>Pontos de Vida:</strong> 1 (1d4 - 1)</p>
                        <p><strong>Velocidade:</strong> 1,5m, voo 18m (12 quadrados)</p>
                      </div>

                      {/* Ability Scores Table */}
                      <div className="grid grid-cols-6 gap-1 text-center my-2.5 border-y border-amber-800/60 py-1.5 text-[10px]">
                        <div><strong className="block text-amber-900">FOR</strong> 3 (-4)</div>
                        <div><strong className="block text-amber-900">DES</strong> 13 (+1)</div>
                        <div><strong className="block text-amber-900">CON</strong> 8 (-1)</div>
                        <div><strong className="block text-amber-900">INT</strong> 2 (-4)</div>
                        <div><strong className="block text-amber-900">SAB</strong> 12 (+1)</div>
                        <div><strong className="block text-amber-900">CAR</strong> 7 (-2)</div>
                      </div>

                      <div className="text-[11px] leading-tight flex flex-col gap-1.5 text-amber-900">
                        <p><strong>Perícias:</strong> Percepção +3, Furtividade +3</p>
                        <p><strong>Sentidos:</strong> Percepção Passiva 13, Visão no Escuro de 36 metros</p>
                        
                        <div className="border-t border-amber-800/30 pt-1.5">
                          <p className="leading-snug">
                            🔥 <strong>Audição e Visão Aguçadas:</strong> A coruja tem vantagem em testes de Sabedoria (Percepção) baseados em audição ou visão.
                          </p>
                          <p className="leading-snug mt-1">
                            💨 <strong>Voo Rasante (Flyby):</strong> A coruja não provoca ataques de oportunidade quando voa para fora do alcance de um inimigo. (Aliado perfeito para a ação <em>Ajudar</em>).
                          </p>
                        </div>

                        <div className="border-t border-amber-800/30 pt-1.5">
                          <span className="font-display font-bold text-amber-900 block text-xs uppercase tracking-wide">Ações</span>
                          <p className="leading-snug mt-0.5">
                            <strong>Garras:</strong> <em>Corpo-a-corpo:</em> +3 para acertar, alcance 1.5m, um alvo. <em>Acerto:</em> 1 de dano cortante.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* O Grimório: O Pergaminho de Couro de Urso */}
              <div className="bg-dark-panel border border-dark-border rounded-xl overflow-hidden">
                <div 
                  onClick={() => toggleItem('grimorio_leather')}
                  className="px-4 py-3 bg-dark-antracite/40 flex justify-between items-center cursor-pointer hover:bg-gray-800/40"
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-display font-bold text-amber-200">
                      O Grimório: O Pergaminho de Couro de Urso
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">
                    {openItem === 'grimorio_leather' ? 'FECHAR' : 'VER ATRIBUTOS'}
                  </span>
                </div>
                {openItem === 'grimorio_leather' && (
                  <div className="p-4 border-t border-dark-border bg-gray-950/30 text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-2">
                    <p>
                      Em vez de um livro encadernado tradicional, seu grimório é um longo e robusto rolo de pergaminho feito de couro texturizado, guardado em um estojo cilíndrico de osso impermeável para protegê-lo da chuva e do sangue dos terríveis combates.
                    </p>
                    <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 text-[11px] text-amber-200/90 mt-1">
                      📖 <strong className="text-amber-400">O Detalhe Arcano:</strong> Os selos originais foram desenhados com uma tinta escura e mística que parece pulsar levemente sob o luar. Ao lado das runas geométricas e imponentes da civilização esquecida, há anotações apressadas, rabiscos em dialeto comum e diagramas simplificados feitos a carvão — as lições e traduções que seu amigo mago deixou para que você pudesse replicar os gestos e fórmulas arcanas perfeitamente.
                    </div>
                  </div>
                )}
              </div>

              {/* Meia Armadura: O Manto do Campeão */}
              <div className="bg-dark-panel border border-dark-border rounded-xl overflow-hidden">
                <div 
                  onClick={() => toggleItem('meia_armadura')}
                  className="px-4 py-3 bg-dark-antracite/40 flex justify-between items-center cursor-pointer hover:bg-gray-800/40"
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-display font-bold text-amber-200">
                      Meia Armadura: O Manto do Campeão
                    </span>
                  </div>
                  <span className="text-gray-500 text-[10px] font-mono">
                    {openItem === 'meia_armadura' ? 'FECHAR' : 'VER ATRIBUTOS'}
                  </span>
                </div>
                {openItem === 'meia_armadura' && (
                  <div className="p-4 border-t border-dark-border bg-gray-950/30 text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-2">
                    <p>
                      Sua armadura é uma fantástica mistura da tecnologia metalúrgica do passado com os trajes práticos e rústicos da sua tribo. Ela consiste em placas de peito, ombreiras e braçadeiras de bronze antigo acopladas sobre grossas camadas de peles e couro de urso.
                    </p>
                    <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20 text-[11px] text-amber-200/90 mt-1">
                      ❄️ <strong className="text-amber-400">O Detalhe Arcano:</strong> As placas de metal foram polidas, mas mantêm a pátina do tempo selvagem. Quando você conjura <em>Vida Falsa (False Life)</em>, uma névoa espectral emana das peles da armadura, moldando-se temporariamente como a silhueta fantasmagórica de um urso heróico ao redor do seu corpo para absorver os golpes antes que atinjam sua carne.
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Section 2: Narrativa Adaptada das Magias */}
          <div>
            <h3 className="text-xs font-display font-semibold uppercase text-gray-500 tracking-widest mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Manifestação Rúnica das Magias
            </h3>

            <div className="flex flex-col gap-2.5">
              
              {/* Vida Falsa */}
              <div className="p-3 bg-dark-panel border border-dark-border rounded-xl text-xs">
                <h4 className="font-display font-bold text-amber-200 mb-1 flex items-center gap-1.5">
                  🛡️ Vida Falsa (False Life)
                </h4>
                <p className="text-gray-300 leading-relaxed font-sans">
                  Narrativamente, não é você conjurando uma magia necromântica. Quando você ativa essa runa antes do combate, os espíritos dos antigos guerreiros formam uma fina aura espectral ao seu redor, absorvendo os primeiros impactos por você.
                </p>
              </div>

              {/* Espeto Mental */}
              <div className="p-3 bg-dark-panel border border-dark-border rounded-xl text-xs">
                <h4 className="font-display font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                  🧠 Espeto Mental (Mind Sliver)
                </h4>
                <p className="text-gray-300 leading-relaxed font-sans">
                  É um grito de guerra infundido com o poder dos selos. Quando você usa, você projeta a presença intimidadora e milenar dos espíritos diretamente na mente do inimigo, atordoando-o.
                </p>
              </div>

              {/* Encontrar Familiar */}
              <div className="p-3 bg-dark-panel border border-dark-border rounded-xl text-xs">
                <h4 className="font-display font-bold text-teal-300 mb-1 flex items-center gap-1.5">
                  🦉 Encontrar Familiar (Find Familiar)
                </h4>
                <p className="text-gray-300 leading-relaxed font-sans">
                  O seu familiar (a coruja) pode ser a manifestação física de um desses espíritos guardiões que decidiu se desprender das ruínas para guiar você fisicamente pelo mundo, agindo como seus olhos e te dando vantagem no combate de forma estratégica.
                </p>
              </div>

              {/* Servo Invisível */}
              <div className="p-3 bg-dark-panel border border-dark-border rounded-xl text-xs">
                <h4 className="font-display font-bold text-gray-200 mb-1 flex items-center gap-1.5">
                  ✨ Servo Invisível (Unseen Servant)
                </h4>
                <p className="text-gray-300 leading-relaxed font-sans">
                  É literalmente um dos espíritos menores da antiga civilização que move objetos e te auxilia de boa vontade, ainda que invisível ao olho nu.
                </p>
              </div>

            </div>
          </div>

        </div>
      ) : (
        <div className="flex flex-col gap-4">
          
          {/* Section 3: Maestria em Arma de Haste 2014 */}
          <div className="bg-dark-panel border border-amber-500/30 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2 bg-amber-950/20 border-b border-dark-border pb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h4 className="font-display font-black text-xs uppercase tracking-wide text-amber-200">
                Talento: Maestria em Arma de Haste
              </h4>
            </div>
            
            <div className="text-xs text-gray-300 leading-relaxed font-sans flex flex-col gap-2.5">
              <p>
                Você consegue manter seus inimigos afastados utilizando armas de haste. Você ganha os seguintes benefícios baseados exatamente na regra de <strong>D&D 5e (2014)</strong>:
              </p>
              <div className="bg-gray-950/60 p-3 rounded-lg border border-dark-border flex flex-col gap-2">
                <p className="leading-tight">
                  ⚡ <strong className="text-amber-400">Ataque de Extremidade:</strong> Quando você realiza a ação de Ataque e ataca com uma glaive, alabarda ou bordão, você pode usar uma <span className="text-amber-400 font-semibold">Ação Bônus</span> para realizar um ataque corpo-a-corpo com a outra extremidade da arma. Esse ataque usa o mesmo modificador de habilidade do ataque primário. O dado de dano para esse ataque é um <strong>d4</strong> e o tipo de dano é concussão.
                </p>
                <p className="leading-tight">
                  🛡️ <strong className="text-cyan-400">Zona de Controle:</strong> Enquanto você estiver empunhando uma glaive, alabarda, lança longa ou bastão (bordão), as outras criaturas provocam um <strong>ataque de oportunidade</strong> a você quando <span className="text-cyan-300 font-semibold">entrarem no seu alcance</span> (perímetro rúnico de 1.5 metros).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Habilidades de Bárbaro 5e 2014 */}
          <div className="border border-dark-border bg-dark-panel rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 border-b border-dark-border pb-2 text-amber-500">
              <Flame className="w-4 h-4 text-amber-500" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-amber-200">
                Características de Bárbaro (Nível 3)
              </h4>
            </div>

            <div className="flex flex-col gap-3 text-xs text-gray-300 leading-snug font-sans">
              
              <div>
                <strong className="text-amber-400 font-mono block mb-0.5">FÚRIA (Rage) - 2014</strong>
                <p className="text-gray-400">
                  Em combate, você luta com ferocidade primal. Como uma <span className="text-gray-200">Ação Bônus</span>, entra em fúria. Dura 1 minuto. Concede bônus de <strong className="text-amber-200 font-bold">+2 no dano</strong> de armas corpo-a-corpo baseadas em Força, vantagem em testes e salvaguardas de Força, e resistência a dano de concussão, cortante e perfurante. Não é possível conjurar ou manter concentração sob fúria.
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-amber-400 font-mono block mb-0.5">ATAQUE IMPRUDENTE (Reckless Attack)</strong>
                <p className="text-gray-400">
                  Ao realizar o primeiro ataque do turno, você pode optar por atacar de forma imprudente. Isso lhe concede <strong className="text-amber-200 font-bold">Vantagem</strong> em todas as jogadas de ataque corpo-a-corpo baseadas em Força durante seu turno, mas os ataques contra você também ganham <strong className="text-amber-200 font-bold">Vantagem</strong> até seu próximo turno.
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-amber-400 font-mono block mb-0.5">SENTIDO DE PERIGO (Danger Sense)</strong>
                <p className="text-gray-400">
                  Você ganha <strong className="text-amber-200 font-bold">Vantagem</strong> em testes de salvaguarda de Destreza contra efeitos que você possa ver (como armadilhas e magias), desde que não esteja cego, surdo ou incapacitado.
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-amber-400 font-mono block mb-0.5 font-bold">ESPÍRITO TOTÊMICO: URSO (Bear Totem Spirit)</strong>
                <p className="text-gray-400">
                  Enquanto estiver em fúria, você ganha resistência a <strong className="text-amber-200 font-bold">todos os tipos de dano</strong>, exceto dano psíquico. O espírito do urso torna seu corpo impenetrável mesmo sob rajadas de fúria arcana.
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-amber-400 font-mono block mb-0.5">DEFESA SEM ARMADURA (Unarmored Defense)</strong>
                <p className="text-gray-400">
                  Enquanto não estiver usando nenhuma armadura, sua CA base é igual a 10 + mod Des (+2) + mod Con (+2) = 14 CA. Você pode usar um escudo e reter esse benefício! (Note: a CA do Portador usa os buffs e itens calculados para base 19).
                </p>
              </div>

            </div>
          </div>

          {/* Section 5: Habilidades de Mago da Guerra 5e 2014 */}
          <div className="border border-dark-border bg-dark-panel rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 border-b border-dark-border pb-2 text-cyan-400">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-cyan-200">
                Características de Mago da Guerra (Nível 2)
              </h4>
            </div>

            <div className="flex flex-col gap-3 text-xs text-gray-300 leading-snug font-sans">
              
              <div>
                <strong className="text-cyan-400 font-mono block mb-0.5 font-bold">DEFLEXÃO ARCANA (Arcane Deflection) - 2014</strong>
                <p className="text-gray-400">
                  Você pode usar sua <span className="text-gray-200 font-semibold">Reação</span> para contra-atacar ameaças: ganhe <strong className="text-cyan-200 font-bold">+2 na CA</strong> contra um ataque desencadeante, ou um bônus de <strong className="text-cyan-200 font-bold">+4 em um teste de salvaguarda</strong> que você tenha falhado. Se o fizer, você não pode conjurar magias que não sejam truques (cantrips) até o final do seu próximo turno. (Funciona na Fúria!).
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-cyan-400 font-mono block mb-0.5">INICIATIVA TÁTICA (Tactical Wit)</strong>
                <p className="text-gray-400">
                  Sua mente ágil permite-lhe avaliar o campo de repouso rapidamente. Você adiciona seu modificador de Inteligência (+1) às suas jogadas de iniciativa.
                </p>
              </div>

              <div className="border-t border-dark-border/40 pt-2.5">
                <strong className="text-cyan-400 font-mono block mb-0.5">RECUPERAÇÃO ARCANA (Arcane Recovery)</strong>
                <p className="text-gray-400">
                  Uma vez por dia durante um descanso curto, você pode escolher recuperar slots de magia gastos. O total somado de círculos deve ser menor ou igual a metade do seu nível de mago (arredondado para cima). Sendo mago lvl 2, você recupera 1 slot de 1º círculo.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
