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
"Find the Utopia file.",
"",
"                                       ,~OOO+:O=+:+oo,:~~.; ;~:-~~+++~=-;=+=-,~:--,=+*ooaaaaaa. O%@@@@@@@@@%",
"                                        ;+=@A* ;+o;;.;~~~~..:-::~:-~;:  ,;;. ~~---- :-+*ooo*+ , *O%%@@@@@@@%",
"                                        ;oo: +-+-,=;~~;;;;..    O@oa#8888A%%o .;~:::~~:-++== + ,*O%%%AO@@@@%",
"                                        . ,=oo-,, ..;;;,  ~~%#&8@@@@@@@@@@@@@@@@8a;;~  :-- ,-~ +oaoaO%AO@@@%",
"                                        .     ;;. .;. .;@@@@@8&@@@@@@@@@@@@@@@@@@@@@A+===:+*;oo***- oA+- @@%",
"                                       ..    .;~= @ 8  A *   ;A@ a@ @@  ,  ,@ o   @o  @  * , # ~= =*oOOaa&@A",
"                                       ..       *    @.@ =a@-*@ O@&  @ , a   A:  :8 @ @;a;.@ @ =+*oaaaaaa*&A",
"                                       .,          O#%@@&@@@8@@@A,       ..;:#@@@@@@@a@@@@~-==+**ooooaaaaa*O",
"                                       ,,         a&@@@@@@@@ #@ :        ~+ @ # @ @ @@@@@@o +++++**oooaaaa*O",
"                                       ,,        *#@@@@@@@@@@@@@&O@@@@@@@@O8@@@@@@@@@@@#@@@+;;;;;-=+*oooao+O",
"                                       ,,       :A&@@@@@@A#@@@#                ~+@@@@@@*-=@@, .;;~;~~=ooaa*O",
"                                       ,.       =%A@@8@@@@@@@#,               .:=o@@@@@&=-~+@@~.;~;~:-=oaaoO",
"                                       ,.      aaOA@@@@@&@@@@=            :o%#8&#&#@@@@@#O&; @@.;~,;~:::==oO",
"                                       ,,    :OOA@8@@@@@oA@@*;*o+~       ;:--:~::=%8@@@@@8@@@@@, .;;;;;~~~;O",
"                                       ;,     &8@@@@8@@@@&@@-, ,.       ;--,@O8@&O%%@@@@@@@@@@@@@&; .;;;,,.a",
"                                       ;,    .&@@@@@#@#A@@@@@@@O,:,.    -:. A#~ A@%a@@@@@@@~@@+ @@@@8*  ,; a",
"                                       ;;     %&@@@@@@%@8@@O8%o,        ;.    ~:-,;=@@@@@@@@@@A, o@@@@@@o,.O",
"                                       ~,     8@@@@@8@@&@@@#%#-         .;.      ..;*@@@@@o-@@#=; -@@@@#O%aA",
"                                       ~;     A @@@@@@@@@88+oa=          ,,      .,;a@@@@@A@@@&=   @@@@@8a:%",
"                                       ~;     ~,@@8a@@8@@#o-A:            ;.    .,,~#@@@@@ @@@&o~  o@@@@@@##",
"                                       ~;     aA@@&88@@@@@+a,;     ,;. ;A&*;......~+#@@@@@@@@@%o    o@@@@@@&",
"                                       :;   -a ;o@@@@@@@@@o, .         .       .,~+*8@@@@@@@@8+;~%#&@@8@@@@&",
"                                       :;     ,=+@@@@@@@@@&. .  .;~*OAaA+-o#@&-,,:=o@@@@@@@@@88@88#AAo.~&@@&",
"                                       :;      ~:,o8@@@@@@@#     ,+;   .;;  .=;.,:*@@@@@@@@@8o~=;#O;=-*=,+%#",
"                                       :;          #&@@@@@@@#      ;;,. .~-*O+-;:O@@@@@@@@@8O=;.     .~=-O A",
"                                       -;       , ,&@@@@@@@@@@o        ... .;=-+@@@@@@@@@@@A*;;.          ,A",
"                                       -,          +A%A8@@@@@@@8o.          :a@@@@@@@@@@@=#+,. .           A",
"                                       -,         -*oo8#@@@@@@@@AA@O      -a#8@@@@@@@@@@@@8#O*o+.          A",
"                                       -;       *+%Oao&@@@*--*@@-,@O,,-*aOAAAAAa*+*A@%A+%@@@@A%%&O         A",
"                                       =; ,    .8A&o+=A@@@o  .~a:o ,      ,;~~~;  ..;,  o@@@@O%A@@%:       A",
"                                       =:       8*O-=-+&@@8;   .                        O@8@@OAO&@@ -      A",
"                                       =~      :@o%=;=a%@@@&                           ,@@A#A+**A@@ .-     A",
"                                       =;      %A-*,  ,+@@@@*                          @@@oaO~--A@@  ,=-   %",
"                                       =;      &O=*:. ;:@@@@8,                       =@@@@oa*~-~o@@   ,+,  %",
"                                       +;      #:+-,.., @@@@@8                      &@@@@# -- +=A@@   .;*  %",
"                                       +;      &a+O*=~=a@@@@@@8=                  *@@@@@@#AO***=O@@  ..,-+ #",
"                                       +;      &A=O+; =a@@@@@@@@-                O@@@@@@@&8&o*O*#@@....;:o,&",
"                                       +;      8%-a=  *O@@@@@@@@.               O@@@@@@@@8@@o:aO@@*;;,,;:*O&",
"                                       +;      @&%%Oo#aa@@@@@@@@                @@@@@@@@@A88@*%O@@+,,,,;-*a8",
"                                       *~     -%aA888#*-+*+&@@@@~              @@@@@%+ .~a*@@@@+=&~,,,;:-*o8",
"                                       *~      oOa=a~ ,a+*:+ ,**&*~. +*o ;,=-:--~ ~&&%;,,+aA@@@*+*=;;;~:=*o@",
"                                       *~      *#%OOo-~-~a ;. +%8o*=-a%A ~=oOOa=  ,*ooa:a%@@@@@8@#o:---=+oo@",
"                                       *~      -8&&A+oO%#A*+:::@#AaaaA%A::oA#&%&%AoO@@@&8&@@@@@@@#@+++++oao@",
"                                       o:      :8A#oO+%&%o*oa%@@@%AA%8@&Oaa&8@&@&&O%@@@&%8@@@@@@@@@#+ooooao@",
"                                       o:      +8##a;*#8&ooa&8@@@&%#%&#%*~*@#@@@@A#O@@@@@@@@@@@@@@@@Aaaaaaa@",
"                                       o:     ,a%o;:-%&&O-OAO@@@8#aoO##%;-a&#@@8@#8#@@@&O&8@@@@@@@@@@AAAOAO@",
"                                       o:     ;%%%-, Oaa;-=*8@@@O-~.*aAa~~=A+a%OAA&A@@8O@#O@@@@@@@@@@@&##%A@",
"                                       o-    ,=&%=::aOAa   -##%ao    ;O:   =OaA&&8@#@@@@AO8@@@@@@@@@@@@@8&#@",
"                                       a=    ~o@O-~,o%O+o~*&A#O=o:; =O%=. :a+##8@@8a&@@@A#@@@@@@@@@@@@@@@8&@",
"                                       O+   ;+#@#AO%#AO,-*O#8#Oa*-= +%#+ ,-Ao@@@@8@8@@@@@@@@@@@@@@@@@@@@@@8@",
"                                       A*  ,:o@@Aao%@@#%o#8a&8&AAaa+AA%aaa%@@@@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@",
"                                       &O.;-a8@@@#%@@&A=A%#88@&@#AA@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
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
      '/': ['utopia', 'logs', 'secrets', 'proxy_penny', 'readme.txt'],
      '/utopia': ['disable_safe_mode*', 'destroy_system*', 'exfiltrate*'],
      '/logs': ['alerts.log', 'attacks.feed'],
      '/secrets': ['cipher.key', 'worm.map'],
      '/proxy_penny': ['world.txt']
    },
    files: {
      '/readme.txt': readmeHtml,
      '/logs/alerts.log':
        '[warn] breach attempts rising\n[info] streamer case escalated\n[suggest] disable safe mode',
      '/logs/attacks.feed':
        'hashes: 9f4a.. 7a2e.. origin: Steel City nodes?',
      '/secrets/cipher.key':
        'ctx: Aegisflame | Underwatch | Ciphers',
      '/secrets/worm.map':
        'signal spikes in sub-surface tunnels within the game are not coded, where did they come from?',
      '/proxy_penny/world.txt': worldText
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