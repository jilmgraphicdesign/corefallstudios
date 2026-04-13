
window.unlockAdmin = function(){
  const input = document.getElementById('passphrase');
  const ok = /\bWAKE\s+THE\s+CORE\b/i.test(input.value);
  const gateMsg = document.getElementById('gateMsg');
  if (ok){
    document.getElementById('gate').classList.add('hidden');
    document.getElementById('terminalWrap').classList.remove('hidden');
    startTerminal();
    window._corefall && window._corefall.playGlitch();
  } else {
    gateMsg.textContent = 'Nope. Decode the three Intel strings (Base64) and enter as a 3-word phrase.';
  }
};

function startTerminal(){
  const out = document.getElementById('terminalOutput');
  const input = document.getElementById('terminalInput');
  const state = {
    cwd: '/',
    fs: {
      '/': ['bin','logs','secrets','readme.txt'],
      '/bin': ['disable_safe_mode*','destroy_system*','exfiltrate*'],
      '/logs': ['alerts.log','attacks.feed'],
      '/secrets': ['cipher.key','worm.map']
    },
    files: {
      '/readme.txt': '<a data-bleed href="proxy_pennyreadme.txt">read me</a>',
      '/logs/alerts.log': '[warn] breach attempts rising\n[info] streamer case escalated\n[suggest] disable safe mode',
      '/logs/attacks.feed': 'hashes: 9f4a.. 7a2e.. origin: Steel City nodes?',
      '/secrets/cipher.key': 'ctx: Aegisflame | Underwatch | Ciphers',
      '/secrets/worm.map': 'signal spikes in sub-surface tunnels within the game are not coded, where did they come from?'
    }
  };

  println('Corefall Admin Console');
  println('Type "help" for commands.');
  prompt();

  function prompt(){ println(`\n${state.cwd} $ `, false); }
  function println(s, nl=true){ out.insertAdjacentHTML('beforeend', escapeHtml(s) + (nl?'\n':'')); out.scrollTop = out.scrollHeight; }
  function escapeHtml(s){ return s.replace(/[&<>]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;' }[c])); }
  function pathJoin(a,b){ if (b.startsWith('/')) return b; if (a.endsWith('/')) return a+b; return a+'/'+b; }
  function isDir(path){ return state.fs[path] !== undefined; }
  function list(path){ return (state.fs[path]||[]).join('  '); }

  document.getElementById('terminalForm').addEventListener('submit', ()=>{
    const cmdline = input.value.trim(); input.value='';
    println(cmdline);
    const [cmd, ...args] = cmdline.split(/\s+/);
    switch ((cmd||'').toLowerCase()){
      case 'help': println('Commands: help, files, folders, ls, cd <folder>, cat <file>, run <prog>, oog data logs, clear, hint'); break;
      case 'ls': println(list(state.cwd)); break;
      case 'cd': {
        const dest = args[0] ? pathJoin(state.cwd, args[0]) : '/';
        if (isDir(dest)) state.cwd = dest; else println('No such directory.');
        println(state.cwd); break;
      }
      case 'cat': {
        const file = args[0]? pathJoin(state.cwd, args[0]) : '';
        if (state.files[file]) println(state.files[file]); else println('No such file.');
        break;
      }
      case 'oog': {
  // allow: oog data logs
  const sub = (args.join(' ') || '').toLowerCase();
  if (sub === 'data logs') {
    println(`

P[OOG-MON] 2025-08-19T02:03:11Z env=prod actor=CIPHERS trigger=driver.tap
E  effect="Dungeon timer freeze" zone="Breachport" duration=90s anomaly=worm-pulse

N[OOG-MON] 2025-08-20T00:22:48Z env=prod actor=CIPHERS trigger=api.spoof
N  effect="PvP bracket rollback" brackets=3 rollback=45s

Y[OOG-MON] 2025-08-20T03:59:04Z env=prod actor=CIPHERS trigger=packet.chaff
K  effect="Aegis ward drain spike" wards=12 drain=+18% zone="Bastion"

N[OOG-MON] 2025-08-20T05:10:21Z env=prod actor=CIPHERS trigger=leaderboard.ghost
O  effect="Leaderboard thrash" swaps=214 suspect_ids=8

W[MITIGATION] 2025-08-21T12:34:02Z rulepush=v0.9.21 actions=rate-limit,event-invalidation status=applied
S[FORENSICS] 2025-08-21T12:39:45Z sig=S-0x29 match=0.92 src=SteelCity-IX out="hash:7a2e..9f4a"

`);
  } else {
    println("usage: oog data logs");
  }
  break;
}
      case 'folders': {
        const prog = args[0]; if (!prog){ println('/bin,/logs,/secrets,/readme.txt'); break; }
        handleRun(prog.replace(/\*$/,'')); break;
      }
      case 'files': {
        const prog = args[0]; if (!prog){ println('/readme.txt, /logs/alerts.log, /logs/attacks.feed, /secrets/cipher.key, /secrets/worm.map'); break; }
        handleRun(prog.replace(/\*$/,'')); break;
      }
      case 'run': {
        const prog = args[0]; if (!prog){ println('run what? see /bin'); break; }
        handleRun(prog.replace(/\*$/,'')); break;
      }
      case 'clear': out.textContent=''; break;
      case 'hint': println('Try: cd /bin  →  ls  →  run disable_safe_mode'); break;
      default: println('Command not found. (help)');
    }
    prompt();
  });

  function handleRun(name){
    switch(name){
      case 'disable_safe_mode':
        println('[*] Toggling safe mode…');
        glitch('Safe mode DISABLED. Simulation boundaries thinning…');
        setTimeout(()=> location.href='outcomes/disable.html', 900);
        break;
      case 'destroy_system':
        println('[*] Initiating self-destruct… 3…2…1…');
        meltdown();
        setTimeout(()=> location.href='outcomes/destroy.html', 1200);
        break;
      case 'exfiltrate':
        println('[*] Packaging logs & secrets…');
        setTimeout(()=>{
          println('Exfiltration complete → artifacts exported.');
          location.href='outcomes/exfiltrate.html';
        }, 1000);
        break;
    }
  }

  function glitch(msg){
    const e = document.createElement('div');
    e.className = 'glitch';
    e.textContent = msg;
    document.getElementById('terminalWrap').appendChild(e);
    setTimeout(()=> e.remove(), 800);
    window._corefall && window._corefall.playGlitch();
  }

  function meltdown(){
    document.body.style.animation = 'shake .18s infinite';
    setTimeout(()=>{ document.body.style.animation='none'; }, 1000);
  }
}
