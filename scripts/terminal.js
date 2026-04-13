window.unlockAdmin = function () {
  const input = document.getElementById('passphrase');
  const ok = /\bWAKE\s+THE\s+CORE\b/i.test(input.value);
  const gateMsg = document.getElementById('gateMsg');

  if (ok) {
    document.getElementById('gate').classList.add('hidden');
    document.getElementById('terminalWrap').classList.remove('hidden');
    startTerminal();
    window._corefall && window._corefall.playGlitch();
  } else {
    gateMsg.textContent =
      'Incorrect passphrase. Decode the three Intel strings (Base64) and enter the 3-word phrase.';
  }
};

function startTerminal() {
  const out = document.getElementById('terminalOutput');
  const input = document.getElementById('terminalInput');
  const form = document.getElementById('terminalForm');

  const worldPortalUrl =
    'https://jilmgraphicdesign.github.io/corefallstudios/proxy_penny/world.html';

const worldText = [
"If you crawled here, you're on the right track.",
"",
"Please find me.",
"",
"This world is not what it seems.",
"",
"where am I?",
"",
].join('\n');

  const readmeHtml = `
<a href="${worldPortalUrl}" target="_blank" rel="noopener noreferrer" style="color:#4FC1FF; text-decoration:underline;">
🌐 Open World Portal
</a>

${worldText}
`;

  const state = {
    cwd: '/',
    fs: {
      '/': ['XXXX', 'logs', 'secrets', 'pVb&^5_pP0*^}', 'readme.txt'],
      '/utopia': ['disable_safe_mode*', 'destroy_system*', 'exfiltrate*'],
      '/logs': ['alerts.log', 'attacks.feed'],
      '/secrets': ['cipher.key', 'worm.map'],
      '/proxy_penny': ['virus']
    },
    files: {
      '/readme.txt': readmeHtml,
      '/logs/alerts.log':
        '[warn] breach attempts rising\n[info] streamer case escalated\n[suggest] disable safe mode\n [warn] via the utopia folder',
      '/logs/attacks.feed':
        'Message broadcast from inside the new Corefall update: hola? c’est me ペニー ik kan’t trovare il dossier sie versuchen ocultar los comandos find Utopía carpeta',
      '/secrets/cipher.key':
        'ctx: Aegisflame | Underwatch | Ciphers | Unknown New Faction',
      '/secrets/worm.map':
        'signal spikes in sub-surface tunnels within the game are not coded, where did they come from? Launch new update as soon as possible.',
      '/proxy_penny/virus': 'WARNING New Virus Detected ---- proxy_penny altering Corefall [WARNING] COREFALL INFECTED UTOPIA INFECTED'
    }
  };

  let initialized = false;

  initTerminal();

  function initTerminal() {
    if (initialized) return;
    initialized = true;

    section('Corefall Admin Console');
    println('Welcome Back Arne Kolbeck.');
    println(
      'If you need any assistance using the terminal please refer to the Terminal Help page in your Admin Portal.',
      true,
      '#9CDCFE'
    );

    blank();
    println('Good starting commands:', true, '#FFD866');
    listItems([
      'help  → see all available commands',
      'ls    → view items in the current location',
      'cd /logs → go to the corefall data folder',
      'cat readme.txt  → you have 1 message unread on terminal from unknown sender',
      'hint  → get a suggested next step'
    ]);

    blank();
    println('Type a command below and press Enter.', true, '#FFD866');
    prompt();

    form.addEventListener('submit', onSubmit);
  }

  function onSubmit(e) {
    e.preventDefault();

    const cmdline = input.value.trim();
    input.value = '';

    if (!cmdline) {
      prompt();
      return;
    }

    userLine(cmdline);

    const [cmd, ...args] = cmdline.split(/\s+/);

    switch ((cmd || '').toLowerCase()) {
      case 'help':
        showHelp();
        break;

      case 'ls':
        showLs();
        break;

      case 'cd':
        changeDirectory(args);
        break;

      case 'cat':
        readFile(args);
        break;

      case 'oog':
        handleOog(args);
        break;

      case 'folders':
        if (args[0]) {
          handleRun(args[0].replace(/\*$/, ''));
        } else {
          showFolders();
        }
        break;

      case 'files':
        if (args[0]) {
          handleRun(args[0].replace(/\*$/, ''));
        } else {
          showFiles();
        }
        break;

      case 'run':
        if (!args[0]) {
          errorLine('You need to specify a program name.');
          tipLine('Try: cd /utopia');
          tipLine('Then: ls');
          tipLine('Then: run disable_safe_mode');
        } else {
          handleRun(args[0].replace(/\*$/, ''));
        }
        break;

      case 'clear':
        out.textContent = '';
        section('Screen Cleared');
        println('Terminal ready.', true, '#9CDCFE');
        break;

      case 'hint':
        showHint();
        break;

      default:
        errorLine('Command not found.');
        tipLine('Type "help" to see available commands.');
        break;
    }

    prompt();
  }

  function showHelp() {
    section('Available Commands');

    println('Navigation', true, '#4EC9B0');
    listItems([
      'ls → list items in the current folder',
      'cd <folder> → move into a folder',
      'cd / → return to the main folder'
    ]);

    blank();
    println('Viewing Files', true, '#4EC9B0');
    listItems([
      'cat <file> → open a file',
      'files → show all known files',
      'folders → show all folders'
    ]);

    blank();
    println('Actions', true, '#4EC9B0');
    listItems([
      'run <program> → execute a program',
      'clear → clear the screen',
      'hint → get a suggested next step'
    ]);

    blank();
    println('Special', true, '#4EC9B0');
    listItems([
      'oog data logs → view anomaly logs'
    ]);
  }

  function showLs() {
    const items = state.fs[state.cwd] || [];

    section(`Contents of ${state.cwd}`);

    if (!items.length) {
      println('This folder is empty.', true, '#9CDCFE');
      return;
    }

    items.forEach((item) => {
      if (item.endsWith('*')) {
        println(`⚙ Program: ${item.replace(/\*$/, '')}`, true, '#4FC1FF');
      } else if (isDir(pathJoin(state.cwd, item))) {
        println(`📁 Folder: ${item}`, true, '#C586C0');
      } else {
        println(`📄 File: ${item}`, true, '#DCDCAA');
      }
    });
  }

  function changeDirectory(args) {
    const rawDest = args[0];

    if (!rawDest) {
      state.cwd = '/';
      println('Moved to the main folder: /', true, '#9CDCFE');
      return;
    }

    const dest = normalizePath(pathJoin(state.cwd, rawDest));

    if (isDir(dest)) {
      state.cwd = dest;
      println(`Now in: ${state.cwd}`, true, '#9CDCFE');
    } else {
      errorLine('That folder does not exist.');
      tipLine('Use "ls" to see available folders.');
    }
  }

  function readFile(args) {
    const rawFile = args[0];

    if (!rawFile) {
      errorLine('You need to specify a file name.');
      tipLine('Example: cat readme.txt');
      return;
    }

    const file = normalizePath(pathJoin(state.cwd, rawFile));

    if (state.files[file]) {
      section(`File: ${file}`);

      if (file === '/readme.txt') {
        println(state.files[file], true, '#DCDCAA', true);
      } else {
        printMultiline(state.files[file], '#DCDCAA');
      }
    } else {
      errorLine('That file does not exist.');
      tipLine('Use "ls" to see files in this folder.');
    }
  }

  function handleOog(args) {
    const sub = (args.join(' ') || '').toLowerCase();

    if (sub === 'data logs') {
      section('OOG Data Logs');

      printMultiline(
`P[OOG-MON] 2025-08-19T02:03:11Z env=prod actor=CIPHERS trigger=driver.tap
E  effect="Dungeon timer freeze" zone="Breachport" duration=90s anomaly=worm-pulse

N[OOG-MON] 2025-08-20T00:22:48Z env=prod actor=CIPHERS trigger=api.spoof
N  effect="PvP bracket rollback" brackets=3 rollback=45s

Y[OOG-MON] 2025-08-20T03:59:04Z env=prod actor=CIPHERS trigger=packet.chaff
K  effect="Aegis ward drain spike" wards=12 drain=+18% zone="Bastion"

N[OOG-MON] 2025-08-20T05:10:21Z env=prod actor=CIPHERS trigger=leaderboard.ghost
O  effect="Leaderboard thrash" swaps=214 suspect_ids=8

W[MITIGATION] 2025-08-21T12:34:02Z rulepush=v0.9.21 actions=rate-limit,event-invalidation status=applied
S[FORENSICS] 2025-08-21T12:39:45Z sig=S-0x29 match=0.92 src=SteelCity-IX out="hash:7a2e..9f4a"`,
        '#CE9178'
      );
    } else {
      errorLine('Invalid OOG command.');
      tipLine('Use: oog data logs');
    }
  }

  function showFolders() {
    section('All Folders');
    listItems([
      '/',
      '/utopia',
      '/logs',
      '/secrets',
      '/proxy_penny'
    ]);
  }

  function showFiles() {
    section('All Files');
    listItems([
      '/readme.txt',
      '/logs/alerts.log',
      '/logs/attacks.feed',
      '/secrets/cipher.key',
      '/secrets/worm.map',
      '/proxy_penny/world.txt'
    ]);
  }

  function showHint() {
    section('Suggested Next Step');
    println('Try this path:', true, '#FFD866');
    listItems([
      'cat readme.txt',
      'cd /proxy_penny',
      'cat world.txt',
      'cd /utopia',
      'ls',
      'run disable_safe_mode'
    ]);
  }

  function handleRun(name) {
    switch (name) {
      case 'disable_safe_mode':
        section('Running Program');
        println('Launching: disable_safe_mode', true, '#4FC1FF');
        println('Please wait...', true, '#9CDCFE');
        glitch('Safe mode DISABLED. Simulation boundaries thinning…');
        setTimeout(() => {
          location.href = 'outcomes/disable.html';
        }, 900);
        break;

      case 'destroy_system':
        section('Running Program');
        println('Launching: destroy_system', true, '#4FC1FF');
        warningLine('Self-destruct sequence initiated...');
        println('3... 2... 1...', true, '#F44747');
        meltdown();
        setTimeout(() => {
          location.href = 'outcomes/destroy.html';
        }, 1200);
        break;

      case 'exfiltrate':
        section('Running Program');
        println('Launching: exfiltrate', true, '#4FC1FF');
        println('Packaging logs and secrets...', true, '#9CDCFE');
        setTimeout(() => {
          println('Exfiltration complete. Artifacts exported.', true, '#4EC9B0');
          location.href = 'outcomes/exfiltrate.html';
        }, 1000);
        break;

      default:
        errorLine(`Unknown program: ${name}`);
        tipLine('Use "cd /utopia" and then "ls" to see available programs.');
        break;
    }
  }

  function prompt() {
    blank();
    println(`Current location: ${state.cwd}`, true, '#569CD6');
    println('Enter command below.', true, '#808080');
  }

  function blank() {
    out.insertAdjacentHTML('beforeend', '\n');
    out.scrollTop = out.scrollHeight;
  }

  function section(title) {
    println(`=== ${title.toUpperCase()} ===`, true, '#4FC1FF');
  }

  function userLine(text) {
    println(`> ${text}`, true, '#FFFFFF');
  }

  function listItems(items) {
    items.forEach((item) => println(` • ${item}`, true, '#D4D4D4'));
  }

  function tipLine(text) {
    println(`Tip: ${text}`, true, '#FFD866');
  }

  function warningLine(text) {
    println(`Warning: ${text}`, true, '#FFB347');
  }

  function errorLine(text) {
    println(`Error: ${text}`, true, '#F44747');
  }

  function printMultiline(text, color = null) {
    text.split('\n').forEach((line) => println(line, true, color));
  }

  function println(text = '', nl = true, color = null, allowHtml = false) {
    const content = allowHtml ? String(text) : escapeHtml(String(text));
    const html = `<span style="color:${color || '#00ff9c'}">${content}</span>${nl ? '\n' : ''}`;
    out.insertAdjacentHTML('beforeend', html);
    out.scrollTop = out.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    }[c]));
  }

  function pathJoin(a, b) {
    if (!b) return a;
    if (b.startsWith('/')) return b;
    if (a === '/') return '/' + b;
    return a + '/' + b;
  }

  function normalizePath(path) {
    return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }

  function isDir(path) {
    return state.fs[path] !== undefined;
  }

  function glitch(msg) {
    const e = document.createElement('div');
    e.className = 'glitch';
    e.textContent = msg;
    document.getElementById('terminalWrap').appendChild(e);
    setTimeout(() => e.remove(), 800);
    window._corefall && window._corefall.playGlitch();
  }

  function meltdown() {
    document.body.style.animation = 'shake .18s infinite';
    setTimeout(() => {
      document.body.style.animation = 'none';
    }, 1000);
  }
}