'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { AudioLines, ChevronDown, Gift, Heart, Music2, Pause, Play, RotateCcw, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { birthday, memoryCards } from '@/data/birthday';

type Stage = 'welcome' | 'letter' | 'memories' | 'cake' | 'gift' | 'finale';
const stages: Stage[] = ['welcome', 'letter', 'memories', 'cake', 'gift', 'finale'];

function Burst({ active }: { active: boolean }) {
  return <div className={`burst ${active ? 'burst-active' : ''}`} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}</div>;
}

function FloatingDecor() {
  return <div className="floating-decor" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <span key={i} style={{ '--i': i } as React.CSSProperties}>{['✦', '♡', '✧', '❀'][i % 4]}</span>)}</div>;
}

export default function BirthdayExperience() {
  const [stage, setStage] = useState<Stage>('welcome');
  const [candlesOut, setCandlesOut] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [wish, setWish] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (stage === 'finale') celebrate();
  }, [stage]);

  function celebrate() {
    confetti({ particleCount: 130, spread: 95, origin: { y: 0.65 }, colors: ['#ff79a7', '#f5bfd6', '#f9df9b', '#b98aff', '#ffffff'] });
    window.setTimeout(() => confetti({ particleCount: 70, angle: 60, spread: 65, origin: { x: 0, y: 0.7 }, colors: ['#ff79a7', '#f5bfd6', '#f9df9b'] }), 300);
    window.setTimeout(() => confetti({ particleCount: 70, angle: 120, spread: 65, origin: { x: 1, y: 0.7 }, colors: ['#ff79a7', '#f5bfd6', '#f9df9b'] }), 550);
  }
  function next() { const i = stages.indexOf(stage); setStage(stages[Math.min(i + 1, stages.length - 1)]); }
  function replay() { setStage('welcome'); setCandlesOut(false); setGiftOpen(false); setLetterOpen(false); setSelectedMemory(null); setWish(false); }

  return <main className="experience">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><FloatingDecor />
    <header className="topbar">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); replay(); }} aria-label="Restart birthday experience"><span className="brand-mark"><Heart size={16} fill="currentColor"/></span><span>A little surprise <b>♡</b></span></a>
      <div className="top-actions"><span className="chapter">{String(stages.indexOf(stage) + 1).padStart(2, '0')} <i>/ 06</i></span><button className="icon-button" onClick={() => setMusicOn(!musicOn)} aria-label={musicOn ? 'Turn music off' : 'Turn music on'} title="Music is a visual toggle in this starter"><AudioLines size={17}/><span className={musicOn ? 'sound-bars playing' : 'sound-bars'}><i/><i/><i/></span></button></div>
    </header>

    <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${((stages.indexOf(stage) + 1) / stages.length) * 100}%` }} transition={{ duration: .6 }}/></div>

    <AnimatePresence mode="wait">
      {stage === 'welcome' && <motion.section key="welcome" className="screen hero-screen" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: reducedMotion ? 0 : .7 }}>
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> A LITTLE WORLD MADE JUST FOR YOU</div><h1><span>Happy</span><em>Birthday</em><span className="heart-outline">♡</span></h1><p className="hero-to">To {birthday.recipient}</p><p className="hero-subtitle">{birthday.subtitle}</p><button className="primary-button" onClick={next}>Open your surprise <span>↗</span></button><div className="hero-foot"><span><span className="pulse-dot"/> Made with love, just for you</span><span>Swipe through the magic <ChevronDown size={14}/></span></div></div>
        <div className="hero-art"><div className="halo halo-a"/><div className="halo halo-b"/><div className="rose rose-left">🌹</div><div className="rose rose-right">🌸</div><div className="glass-orb"><div className="orb-glow"/><Heart className="orb-heart" fill="currentColor" strokeWidth={0}/><span className="orb-spark s1">✦</span><span className="orb-spark s2">✧</span><span className="orb-spark s3">♡</span></div><div className="art-caption"><span>01 / THE BEGINNING</span><b>Something lovely awaits</b></div></div>
      </motion.section>}

      {stage === 'letter' && <motion.section key="letter" className="screen letter-screen" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: reducedMotion ? 0 : .55 }}>
        <div className="section-intro"><div className="eyebrow"><span>✦</span> WORDS FROM THE HEART</div><h2>A little letter,<br/><em>just for you.</em></h2><p>Some things deserve more than a message.</p></div>
        <div className={`letter-scene ${letterOpen ? 'opened' : ''}`}><div className="letter-envelope"><div className="envelope-flap"/><div className="wax-seal">♡</div><div className="letter-paper"><span className="paper-kicker">A LITTLE NOTE FOR YOU</span><h3>Dear birthday star,</h3>{birthday.letter.map((line, i) => <p key={i}>{line}</p>)}<div className="signature">With all my love <span>♡</span></div></div></div><button className="text-button letter-trigger" onClick={() => setLetterOpen(!letterOpen)}>{letterOpen ? 'Fold the letter' : 'Unfold your letter'} <span>{letterOpen ? '↑' : '↓'}</span></button></div>
        <button className="primary-button" onClick={next}>Keep the memories coming <span>↗</span></button>
      </motion.section>}

      {stage === 'memories' && <motion.section key="memories" className="screen memories-screen" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: reducedMotion ? 0 : .55 }}>
        <div className="section-intro"><div className="eyebrow"><span>✦</span> LITTLE THINGS TO REMEMBER</div><h2>Some beautiful<br/><em>moments.</em></h2><p>No photos needed. Just a few reminders of how special you are.</p></div>
        <div className="memory-grid">{memoryCards.map((card, i) => <motion.button type="button" key={card.title} className={`memory-card memory-${i + 1} ${selectedMemory === i ? 'memory-selected' : ''}`} aria-expanded={selectedMemory === i} onClick={() => setSelectedMemory(selectedMemory === i ? null : i)} initial={{ opacity: 0, y: 20, rotate: (i % 2 ? 2 : -2) }} animate={{ opacity: 1, y: 0, rotate: (i % 2 ? 2 : -2) }} transition={{ delay: reducedMotion ? 0 : i * .09 }} whileHover={reducedMotion ? undefined : { y: -7, rotate: 0, scale: 1.025 }} whileTap={reducedMotion ? undefined : { scale: .98 }}><span className="memory-number">0{i + 1}</span><span className="memory-illustration" aria-hidden="true">{card.icon}</span><span className="memory-card-title">{card.title}</span><span className="memory-card-note">{card.note}</span><span className="memory-heart">♡</span><span className="memory-open-hint">{selectedMemory === i ? 'CLOSE NOTE −' : 'OPEN NOTE +'}</span></motion.button>)}</div>
        <AnimatePresence initial={false}>
          {selectedMemory !== null && (
            <motion.section
              className="memory-letter-panel"
              key={selectedMemory}
              initial={{ opacity: 0, height: 0, y: 12 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 8 }}
              transition={{ duration: reducedMotion ? 0 : 0.35 }}
              aria-label={`${memoryCards[selectedMemory].title} letter`}
            >
              <div className="memory-letter-paper">
                <button
                  type="button"
                  className="memory-letter-close"
                  onClick={() => setSelectedMemory(null)}
                  aria-label="Close memory letter"
                >
                  <X size={17} />
                </button>
                <div className="memory-letter-body">
                  <div className="memory-letter-text">
                    <span className="paper-kicker">A LITTLE NOTE FOR YOU</span>
                    <div className="memory-letter-flower">❀　♡　❀</div>
                    <h3>{memoryCards[selectedMemory].title}</h3>
                    <p className="memory-letter-note-text">{memoryCards[selectedMemory].note}</p>
                    <p>{birthday.letter[selectedMemory % birthday.letter.length]}</p>
                    <div className="signature">
                      With all my love <span>♡</span>
                    </div>
                  </div>
                  <div className="memory-letter-media">
                    <div className="memory-letter-photo-frame">
                      <div className="memory-letter-photo-tape" aria-hidden="true" />
                      <img
                        src={memoryCards[selectedMemory].image}
                        alt={memoryCards[selectedMemory].title}
                        className="memory-letter-img"
                        width={415}
                        height={624}
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        <button className="primary-button" onClick={next}>Make a birthday wish <span>↗</span></button>
      </motion.section>}

      {stage === 'cake' && <motion.section key="cake" className="screen cake-screen" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: reducedMotion ? 0 : .55 }}>
        <div className="section-intro"><div className="eyebrow"><span>✦</span> YOUR MOMENT TO WISH</div><h2>Close your eyes<br/><em>and make a wish.</em></h2><p>Every candle holds a little hope for the year ahead.</p></div>
        <div className="cake-stage"><div className="cake-moon"/><div className="cake-sparkle sp1">✦</div><div className="cake-sparkle sp2">✧</div><div className="cake-sparkle sp3">✦</div><div className="cake-3d" role="img" aria-label="A pink birthday cake with candles"><div className="cake-candles">{[0,1,2,3,4].map(n => <div className="candle" key={n}><span className={`flame ${candlesOut ? 'out' : ''}`}/><i/></div>)}</div><div className="cake-top"><span>♡</span><span>✿</span><span>♡</span></div><div className="cake-body"><span className="cake-message">Happy<br/>Birthday</span><div className="icing-drips"><i/><i/><i/><i/><i/><i/><i/></div></div><div className="cake-base"/></div><div className="cake-plate"/><div className="cake-teddy">🧸</div></div>
        <div className="wish-message">{candlesOut ? 'Your wish is on its way to the stars. ✨' : 'Take a breath. Think of something wonderful.'}</div><button className="primary-button" onClick={() => { if (!candlesOut) { setCandlesOut(true); setWish(true); confetti({ particleCount: 65, spread: 55, origin: { y: .58 }, colors: ['#ff79a7', '#f8d4e2', '#f9df9b'] }); } else next(); }}>{candlesOut ? 'Open your gift' : 'Blow out the candles'} <span>{candlesOut ? '↗' : '✧'}</span></button>{wish && <p className="tiny-note">Wish made. Keep it close to your heart.</p>}
      </motion.section>}

      {stage === 'gift' && <motion.section key="gift" className="screen gift-screen" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: reducedMotion ? 0 : .55 }}>
        <div className="section-intro"><div className="eyebrow"><span>✦</span> ONE LAST LITTLE SURPRISE</div><h2>A special gift<br/><em>just for you.</em></h2><p>Something lovely is waiting inside. Tap to unwrap it.</p></div>
        <div className={`gift-scene ${giftOpen ? 'gift-open' : ''}`}><div className="gift-glow"/><div className="gift-sparkles">✦　♡　✧　✦</div><div className="gift-box" onClick={() => setGiftOpen(true)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setGiftOpen(true); }} aria-label="Open the surprise gift"><div className="gift-note"><span>♡</span><b>You are so loved.</b><small>Never forget how wonderful you are.</small></div><div className="gift-lid"><div className="gift-bow"><i/><i/><b/></div></div><div className="gift-front"><span className="gift-ribbon"/><span className="gift-ribbon-horizontal"/><Heart className="gift-heart" fill="currentColor"/></div></div><div className="gift-shadow"/></div>
        <AnimatePresence>{giftOpen && <motion.div className="gift-reveal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span className="reveal-label"><Sparkles size={14}/> YOUR LITTLE REMINDER</span><p>You make the world a softer, brighter, more beautiful place. I hope this next chapter gives you a thousand reasons to smile. <b>You deserve so much happiness. ♡</b></p></motion.div>}</AnimatePresence>
        <button className="primary-button" onClick={() => giftOpen ? next() : (setGiftOpen(true), confetti({ particleCount: 55, spread: 65, origin: { y: .62 } }))}>{giftOpen ? 'See your birthday wish' : 'Open the gift'} <span>↗</span></button>
      </motion.section>}

      {stage === 'finale' && <motion.section key="finale" className="screen finale-screen" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .8 }}><div className="finale-sky"><div className="finale-sun"/><div className="finale-hill hill-back"/><div className="finale-hill hill-front"/><span className="final-flower f1">🌷</span><span className="final-flower f2">🌹</span><span className="final-flower f3">🌸</span><span className="final-balloon b1">♡</span><span className="final-balloon b2">♡</span><span className="final-balloon b3">♡</span></div><div className="finale-copy"><div className="eyebrow"><Sparkles size={14}/> AND A THOUSAND WISHES MORE</div><h2>Happy Birthday,<br/><em>my special one.</em></h2><span className="final-heart">♡</span><p>{birthday.closing}</p><div className="finale-actions"><button className="primary-button" onClick={replay}><RotateCcw size={15}/> Relive the magic</button><button className="round-button" onClick={celebrate} aria-label="Celebrate again"><Heart size={18}/></button></div><span className="final-signoff">Made with a little extra love <span>♡</span></span></div></motion.section>}
    </AnimatePresence>

    <footer className="bottom-bar"><span>✦ <b>BIRTHDAY WONDERLAND</b> <i>· A digital gift</i></span><span className="footer-center">TAKE YOUR TIME. ENJOY THE MAGIC.</span><span className="footer-right">{stages.indexOf(stage) + 1} OF 6 <span>♡</span></span></footer>
  </main>;
}
