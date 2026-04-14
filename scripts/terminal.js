window.unlockAdmin = function () {
  var input = document.getElementById('passphrase');
  var ok = /\bWAKE\s+THE\s+CORE\b/i.test(input.value);
  var gateMsg = document.getElementById('gateMsg');

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

var corruptionLevel = 0;

function startTerminal() {
  var out = document.getElementById('terminalOutput');
  var termWrap = document.getElementById('terminalWrap');
  var inputField = document.getElementById('terminalInput');
  var promptEl = document.getElementById('termPrompt');

  var worldPortalUrl =
    'https://jilmgraphicdesign.github.io/corefallstudios/proxy_penny/world.html';

  var worldText = [
    'If you crawled here, you\'re on the right track.', '',
    'Please find me.', '',
    'This world is not what it seems.', '',
    'where am I?', ''
  ].join('\n');

  var readmeHtml = '<a href="' + worldPortalUrl + '" target="_blank" rel="noopener noreferrer" style="color:#4FC1FF; text-decoration:underline;">\uD83C\uDF10 Open World Portal</a>\n\n' + worldText;

  var state = {
    cwd: '/',
    fs: {
      '/': ['XXXX', 'logs', 'secrets', 'pVb&^5_pP0*^}', 'readme.txt'],
      '/utopia': ['disable_safe_mode*', 'destroy_system*', 'exfiltrate*'],
      '/XXXX': [],
      '/logs': ['alerts.log', 'attacks.feed'],
      '/secrets': ['cipher.key', 'worm.map'],
      '/pVb&^5_pP0*^}': [],
      '/proxy_penny': ['virus']
    },
    files: {
      '/readme.txt': readmeHtml,
      '/logs/alerts.log':
        '[warn] \u26A0\uFE0F breach attempts rising\n[info] streamer case escalated\n[suggest] disable safe mode\n[warn] \u26A0\uFE0F via the XXXXXX folder',
      '/logs/attacks.feed':
        'Message broadcast from inside the new Corefall update: hola? c\u2019est me \u30da\u30cb\u30fc ik kan\'t trovare il dossier sie versuchen ocultar los comandos find Utop\u00eda carpeta',
      '/secrets/cipher.key':
        'ctx: Aegisflame | Underwatch | Ciphers | \u26A0\uFE0F Unknown New Faction',
      '/secrets/worm.map':
        'signal spikes in sub-surface tunnels within the game are not coded, where did they come from? Launch new update as soon as possible.',
      '/proxy_penny/virus':
        'WARNING \u26A0\uFE0F New Virus Detected ---- proxy_penny altering Corefall [WARNING] \u26A0\uFE0F COREFALL INFECTED UTOPIA INFECTED'
    }
  };

  var cmdHistory = [];
  var histIdx = -1;

  /* ── prompt string ── */
  function ps1() {
    var dir = state.cwd === '/' ? '~' : '~' + state.cwd;
    return 'arne@corefall:' + dir + '$ ';
  }

  function updatePrompt() {
    promptEl.textContent = ps1();
  }

  /* ── output helpers ── */
  function write(text, color, allowHtml) {
    var span = document.createElement('span');
    if (color) span.style.color = color;
    if (allowHtml) span.innerHTML = text;
    else span.textContent = text;
    out.appendChild(span);
    out.scrollTop = out.scrollHeight;
  }

  function writeln(text, color, allowHtml) {
    write((text || '') + '\n', color, allowHtml);
  }

  function blank() { writeln(''); }

  function echoCmd(cmd) {
    write(ps1(), '#7eb86a');
    writeln(cmd, '#e0e0e0');
  }

  function errorLine(text) { writeln(text, '#F44747'); }
  function warnLine(text) { writeln(text, '#FFB347'); }
  function tipLine(text) { writeln('  ' + text, '#808080'); }

  function printMultiline(text, color) {
    text.split('\n').forEach(function (line) { writeln(line, color); });
  }

  /* ── input handling ── */
  inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var cmd = inputField.value;
      inputField.value = '';

      echoCmd(cmd);

      if (cmd.trim()) {
        cmdHistory.push(cmd.trim());
        histIdx = cmdHistory.length;
        processCommand(cmd.trim());
      }

      updatePrompt();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; inputField.value = cmdHistory[histIdx]; }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) { histIdx++; inputField.value = cmdHistory[histIdx]; }
      else { histIdx = cmdHistory.length; inputField.value = ''; }
    }
  });

  /* click anywhere in terminal → focus (but not during text selection) */
  termWrap.addEventListener('click', function () {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      inputField.focus();
    }
  });

  /* ── boot sequence ── */
  writeln('Corefall Systems v4.2.1-rel (tty0)', '#569CD6');
  writeln('Login: arne.kolbeck \u2014 authenticated via CSO token', '#808080');
  blank();
  writeln('\u26A0\uFE0F You have 1 unread message from unknown sender.', '#FFD866');
  writeln('  read with: cat readme.txt', '#808080');
  blank();
  writeln('Type "help" for available commands.', '#808080');
  blank();

  updatePrompt();
  inputField.focus();

  /* ── command router ── */
  function processCommand(cl) {
    var parts = cl.split(/\s+/);
    var cmd = (parts[0] || '').toLowerCase();
    var args = parts.slice(1);

    switch (cmd) {
      case 'help':    showHelp(); break;
      case 'ls':      showLs(); break;
      case 'cd':      changeDir(args); break;
      case 'cat':     readFile(args); break;
      case 'oog':     handleOog(args); break;
      case 'folders': args[0] ? handleRun(args[0].replace(/\*$/, '')) : showFolders(); break;
      case 'files':   args[0] ? handleRun(args[0].replace(/\*$/, '')) : showFiles(); break;
      case 'run':
        if (!args[0]) { errorLine('run: missing operand'); tipLine('usage: run <program>'); }
        else handleRun(args[0].replace(/\*$/, ''));
        break;
      case 'clear':
        out.textContent = '';
        break;
      case 'hint':    showHint(); break;
      case 'pwd':     writeln(state.cwd); break;
      case 'whoami':  writeln('arne.kolbeck'); break;
      default:
        errorLine(cmd + ': command not found');
        tipLine('Type "help" to see available commands.');
    }
  }

  /* ── commands ── */
  function showHelp() {
    var lines = [
      'ls                   list directory contents',
      'cd <dir>             change directory',
      'cd /                 return to root',
      'cat <file>           display file contents',
      'run <program>        execute a program',
      'pwd                  print working directory',
      'whoami               display current user',
      'files                list all known files',
      'folders              list all known directories',
      'oog data logs        display anomaly telemetry',
      'hint                 suggested next step',
      'clear                clear screen'
    ];
    lines.forEach(function (l) { writeln(l); });
  }

  function showLs() {
    var items = state.fs[state.cwd] || [];
    if (!items.length) { writeln('(empty)', '#808080'); return; }
    items.forEach(function (item) {
      if (item.endsWith('*'))      writeln('\u2699 ' + item, '#4EC9B0');
      else if (isDir(pathJoin(state.cwd, item))) writeln('\uD83D\uDCC1 ' + item + '/', '#569CD6');
      else                          writeln('\uD83D\uDCC4 ' + item);
    });
  }

  function changeDir(args) {
    var d = args[0];
    if (!d || d === '/' || d === '~') { state.cwd = '/'; return; }
    var dest = norm(pathJoin(state.cwd, d));
    if (isDir(dest)) state.cwd = dest;
    else errorLine('cd: ' + d + ': No such directory');
  }

  function readFile(args) {
    var f = args[0];
    if (!f) { errorLine('cat: missing operand'); return; }
    var fp = norm(pathJoin(state.cwd, f));
    if (state.files[fp] !== undefined) {
      if (fp === '/readme.txt') write(state.files[fp] + '\n', '#DCDCAA', true);
      else printMultiline(state.files[fp], '#DCDCAA');
    } else errorLine('cat: ' + f + ': No such file');
  }

  function handleOog(args) {
    if ((args.join(' ') || '').toLowerCase() === 'data logs') {
      printMultiline(
        'P[OOG-MON] 2025-08-19T02:03:11Z env=prod actor=CIPHERS trigger=driver.tap\n' +
        'E  effect="Dungeon timer freeze" zone="Breachport" duration=90s anomaly=worm-pulse\n' +
        '\n' +
        'N[OOG-MON] 2025-08-20T00:22:48Z env=prod actor=CIPHERS trigger=api.spoof\n' +
        'N  effect="PvP bracket rollback" brackets=3 rollback=45s\n' +
        '\n' +
        'Y[OOG-MON] 2025-08-20T03:59:04Z env=prod actor=CIPHERS trigger=packet.chaff\n' +
        'K  effect="Aegis ward drain spike" wards=12 drain=+18% zone="Bastion"\n' +
        '\n' +
        'N[OOG-MON] 2025-08-20T05:10:21Z env=prod actor=CIPHERS trigger=leaderboard.ghost\n' +
        'O  effect="Leaderboard thrash" swaps=214 suspect_ids=8\n' +
        '\n' +
        'W[MITIGATION] 2025-08-21T12:34:02Z rulepush=v0.9.21 actions=rate-limit,event-invalidation status=applied\n' +
        'S[FORENSICS] 2025-08-21T12:39:45Z sig=S-0x29 match=0.92 src=SteelCity-IX out="hash:7a2e..9f4a"',
        '#CE9178'
      );
    } else { errorLine('oog: invalid subcommand'); tipLine('usage: oog data logs'); }
  }

  function showFolders() {
    ['/', '/XXXXXX', '/logs', '/secrets', '/p%$#!_p*&^%'].forEach(function (f) { writeln(f, '#569CD6'); });
  }

  function showFiles() {
    ['/readme.txt', '/logs/alerts.log', '/logs/attacks.feed',
     '/secrets/cipher.key', '/secrets/worm.map', '/proxy_penny/virus'
    ].forEach(function (f) { writeln(f); });
  }

  function showHint() {
    writeln('Try:', '#808080');
    writeln('  cat readme.txt', '#FFD866');
    writeln('  ls', '#FFD866');
    writeln('  oog data logs', '#FFD866');
  }

  function handleRun(name) {
    switch (name) {
      case 'disable_safe_mode':
        writeln('Launching: disable_safe_mode', '#4FC1FF');
        writeln('Please wait...', '#808080');
        glitch('Safe mode DISABLED. Simulation boundaries thinning\u2026');
        setTimeout(function () { location.href = 'outcomes/disable.html'; }, 1200);
        break;
      case 'destroy_system':
        writeln('Launching: destroy_system', '#4FC1FF');
        warnLine('Self-destruct sequence initiated...');
        writeln('3... 2... 1...', '#F44747');
        meltdown();
        setTimeout(function () { location.href = 'outcomes/destroy.html'; }, 1200);
        break;
      case 'exfiltrate':
        writeln('Launching: exfiltrate', '#4FC1FF');
        writeln('Packaging logs and secrets...', '#808080');
        setTimeout(function () {
          writeln('Exfiltration complete. Artifacts exported.', '#4EC9B0');
          location.href = 'outcomes/exfiltrate.html';
        }, 1200);
        break;
      default:
        errorLine('run: ' + name + ': program not found');
        tipLine('cd /utopia && ls to see available programs.');
    }
  }

  /* ── path utilities ── */
  function pathJoin(a, b) { if (!b) return a; if (b[0] === '/') return b; return (a === '/' ? '/' : a + '/') + b; }
  function norm(p) { return p.replace(/\/+/g, '/').replace(/\/$/, '') || '/'; }
  function isDir(p) { return state.fs[p] !== undefined; }

  /* ── effects ── */
  function glitch(msg) {
    var e = document.createElement('div');
    e.className = 'glitch';
    e.textContent = msg;
    termWrap.appendChild(e);
    setTimeout(function () { e.remove(); }, 800);
    window._corefall && window._corefall.playGlitch();
  }

  function meltdown() {
    document.body.style.animation = 'shake .18s infinite';
    setTimeout(function () { document.body.style.animation = 'none'; }, 1000);
  }

  /* ── ghost layer ── */
  (function () {
    setInterval(function () {
      if (Math.random() < 0.25) {
        document.documentElement.style.filter = 'contrast(' + (1 + Math.random() * 0.2) + ') brightness(' + (1 + Math.random() * 0.2) + ')';
        setTimeout(function () { document.documentElement.style.filter = ''; }, 120);
      }
      if (Math.random() < 0.18) {
        document.body.style.transform = 'translate(' + (Math.random() * 2 - 1) + 'px, ' + (Math.random() * 2 - 1) + 'px)';
        setTimeout(function () { document.body.style.transform = ''; }, 100);
      }
    }, 1400);

    var ghostLines = ['proxy_penny', 'are you still there?', 'they are watching', 'don\'t trust the system', 'something is wrong here', 'please help me', 'safe mode: disabled', 'wake up', 'corruption detected'];
    function ghostText() {
      if (Math.random() < 0.14) {
        var msg = ghostLines[Math.floor(Math.random() * ghostLines.length)];
        var el = document.createElement('div');
        el.textContent = msg;
        el.style.cssText = 'position:absolute;left:' + (Math.random() * 70) + '%;top:' + (Math.random() * 80) + '%;color:#ff4fc1;opacity:0.35;pointer-events:none;font-family:monospace;text-shadow:0 0 6px #ff4fc1;z-index:10';
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, 900);
      }
    }
    setInterval(ghostText, 2200);

    setInterval(function () {
      if (window._corefall && Math.random() < 0.12) window._corefall.playGlitch();
    }, 3000);
  })();

  /* ── utopia chaos ── */
  (function () {
    var chaosInterval = null;
    function isUtopia() { return state.cwd === '/utopia'; }
    function startChaos() {
      if (chaosInterval) return;
      chaosInterval = setInterval(function () {
        document.body.style.animation = 'shake 0.06s infinite';
        document.documentElement.style.filter = 'contrast(' + (1 + Math.random() * 0.5) + ') brightness(' + (1 + Math.random() * 0.4) + ') hue-rotate(' + (Math.random() * 20) + 'deg)';
        document.body.style.transform = 'translate(' + (Math.random() * 6 - 3) + 'px, ' + (Math.random() * 6 - 3) + 'px)';
        if (window._corefall && Math.random() < 0.35) window._corefall.playGlitch();
      }, 180);
    }
    function stopChaos() {
      if (!chaosInterval) return;
      clearInterval(chaosInterval); chaosInterval = null;
      document.body.style.animation = '';
      document.documentElement.style.filter = '';
      document.body.style.transform = '';
    }
    setInterval(function () {
      if (isUtopia()) startChaos(); else stopChaos();
    }, 200);
  })();
}
