import { useMemo, useState } from 'react';
import { AudioLines, ChevronDown, Mic2, Play, Sparkles, WandSparkles } from 'lucide-react';

type Voice = { id: string; name: string; gender: 'Male' | 'Female'; style: string; detail: string };

const voices: Voice[] = [
  { id: 'atlas', name: 'Atlas', gender: 'Male', style: 'Deep & Powerful', detail: 'Heavy, rich low register with strong presence.' },
  { id: 'milo', name: 'Milo', gender: 'Male', style: 'Natural & Conversational', detail: 'Full, relaxed and easy to listen to.' },
  { id: 'ryder', name: 'Ryder', gender: 'Male', style: 'Husky & Textured', detail: 'Distinctive grain with a confident edge.' },
  { id: 'adrian', name: 'Adrian', gender: 'Male', style: 'Smooth & Sophisticated', detail: 'Clean, polished and naturally composed.' },
  { id: 'jace', name: 'Jace', gender: 'Male', style: 'Young & Energetic', detail: 'Youthful creator energy with real vocal body.' },
  { id: 'vera', name: 'Vera', gender: 'Female', style: 'Rich & Warm', detail: 'Full-bodied, mature and inviting.' },
  { id: 'nora', name: 'Nora', gender: 'Female', style: 'Natural & Grounded', detail: 'Conversational, clear and believable.' },
  { id: 'selene', name: 'Selene', gender: 'Female', style: 'Deep & Rich', detail: 'Naturally low, dark and unmistakably feminine.' },
  { id: 'maya', name: 'Maya', gender: 'Female', style: 'Young & Energetic', detail: 'Lively young-adult creator presence.' },
];

function App() {
  const [gender, setGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selected, setSelected] = useState('atlas');
  const [script, setScript] = useState('At exactly 3:17 in the morning, something strange happened. Every radio telescope on Earth detected the same signal.');
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState('Cinematic');

  const filtered = useMemo(() => gender === 'All' ? voices : voices.filter(v => v.gender === gender), [gender]);
  const active = voices.find(v => v.id === selected) ?? voices[0];

  const preview = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script || 'Choose a script to preview your voice.');
    utterance.rate = mode === 'Cinematic' ? 0.88 : mode === 'Energetic' ? 1.06 : 0.98;
    utterance.pitch = active.gender === 'Female' ? 1.04 : active.id === 'atlas' || active.id === 'selene' ? 0.82 : 0.96;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><div className="brandMark"><AudioLines size={19} /></div><span>vocalis</span></div>
        <nav><a className="active" href="#studio">Studio</a><a href="#voices">Voices</a><a href="#api">API</a></nav>
        <button className="ghost">Sign in</button>
      </header>

      <section id="studio" className="hero">
        <div className="eyebrow"><Sparkles size={14} /> CREATOR VOICE STUDIO</div>
        <h1>Give your words a <em>real voice.</em></h1>
        <p>Choose a distinct vocal identity, shape the delivery, and turn your script into narration that feels made by a person—not a preset.</p>
      </section>

      <section className="studioGrid">
        <aside className="voicePanel" id="voices">
          <div className="panelHead"><div><span className="label">VOICE LIBRARY</span><h2>Choose a voice</h2></div><span className="count">{voices.length} identities</span></div>
          <div className="tabs">{(['All','Male','Female'] as const).map(g => <button key={g} className={gender === g ? 'selectedTab' : ''} onClick={() => setGender(g)}>{g}</button>)}</div>
          <div className="voiceList">
            {filtered.map(v => <button key={v.id} className={`voiceCard ${selected === v.id ? 'selectedVoice' : ''}`} onClick={() => setSelected(v.id)}><span className={`voiceOrb ${v.gender.toLowerCase()}`}>{v.gender === 'Male' ? 'M' : 'F'}</span><span className="voiceCopy"><strong>{v.name}</strong><small>{v.style}</small></span><ChevronDown size={16} className="chevron" /></button>)}
          </div>
        </aside>

        <section className="workbench">
          <div className="selectedHeader"><div><span className="label">SELECTED VOICE</span><div className="selectedName"><h2>{active.name}</h2><span>{active.gender}</span></div><p>{active.detail}</p></div><button className="round" onClick={preview} title="Preview voice"><Play size={17} fill="currentColor" /></button></div>
          <div className="delivery"><span className="label">DELIVERY</span><div className="modeRow">{['Natural','Cinematic','Energetic'].map(m => <button key={m} className={mode === m ? 'modeActive' : ''} onClick={() => setMode(m)}>{m}</button>)}</div></div>
          <div className="scriptBox"><div className="scriptTop"><span className="label">SCRIPT</span><span>{script.length} characters</span></div><textarea value={script} onChange={e => setScript(e.target.value)} placeholder="Paste your script here..." /><div className="scriptBottom"><span>Performance will adapt to your selected delivery.</span><button onClick={() => setScript('At exactly 3:17 in the morning, something strange happened. Every radio telescope on Earth detected the same signal. It lasted only eleven seconds. Then... it disappeared.') }><WandSparkles size={15} /> Try a sample</button></div></div>
          <button className="generate" onClick={preview}><Mic2 size={18} /> {playing ? 'Playing preview…' : 'Preview voice'}</button>
          <div className="notice">Browser preview is a product prototype. The production engine will replace this preview with the locked Vocalis identities and server-side generation pipeline.</div>
        </section>
      </section>

      <section className="apiSection" id="api"><div><span className="label">BUILT FOR BUILDERS</span><h2>One voice engine.<br /><em>Your app + your API.</em></h2></div><p>Vocalis is being designed around the same core voice technology for creators and developers. Generate in Studio, then integrate the engine programmatically with API keys and usage-based access.</p></section>
      <footer><span>vocalis © 2026</span><span>Voice identities are original fictional voices.</span></footer>
    </main>
  );
}

export default App;
