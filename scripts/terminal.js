window.unlockAdmin = function () {
  const input = document.getElementById('passphrase');
  const gateMsg = document.getElementById('gateMsg');

  const ok = /\bWAKE\s+THE\s+CORE\b/i.test(input.value);

  if (!ok) {
    gateMsg.textContent =
      'Incorrect passphrase. Decode the three Intel strings (Base64) and enter the 3-word phrase.';
    return;
  }

  document.getElementById('gate').classList.add('hidden');
  document.getElementById('terminalWrap').classList.remove('hidden');

  startTerminal();
  window._corefall?.playGlitch();
};

function startTerminal() {
  const out = document.getElementById('terminalOutput');
  const input = document.getElementById('terminalInput');
  const form = document.getElementById('terminalForm');

  const worldPortalUrl =
    'https://jilmgraphicdesign.github.io/corefallstudios/proxy_penny/world.html';

  // ✅ CLEAN TEXT (NO \ BREAKS)
  const introText = `If you crawled here, you're on the right track.

Please find me.

This world is not what it seems.

Find the Utopia file.`;

  // ✅ ASCII (KEPT RAW)
  const asciiArt = `
,~OOO+:O=+:+oo,:~~.; ;~:-~~+++~=-;=+=-,~:--,=+*ooaaaaaa.
;+=@A* ;+o;;.;~~~~..:-::~:-~;:  ,;;. ~~---- :-+*ooo*+
;oo: +-+-,=;~~;;;;..    O@oa#8888A%%o .;~:::~~:-++==
. ,=oo-,, ..;;;,  ~~%#&8@@@@@@@@@@@@@@@@8a;;~
...
`;

  // ✅ FINAL HTML (HYBRID RENDER)
  const readmeHtml = `
<a href="${worldPortalUrl}" target="_blank" style="color:#4FC1FF;text-decoration:underline;">
🌐 Open World Portal
</a>

${introText.replace(/\n/g, '<br>')}

<pre class="ascii">${asciiArt}</pre>
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
      '/proxy_penny/world.txt': introText + '\n\n' + asciiArt
    }
  };

  init();

  function init() {
    section('Corefall Admin Console');
    println('Welcome Back.');
    println('Type "help" to begin.', true, '#FFD866');

    form.addEventListener('submit', handleCommand);
    prompt();
  }

  function handleCommand(e) {
    e.preventDefault();

    const cmdline = input.value.trim();
    input.value = '';

    if (!cmdline) return prompt();

    userLine(cmdline);

    const [cmd, ...args] = cmdline.split(/\s+/);

    switch (cmd) {
      case 'help':
        println('Commands: ls, cd, cat, clear, hint');
        break;

      case 'ls':
        (state.fs[state.cwd] || []).forEach(i => println(i));
        break;

      case 'cd':
        const dest = args[0] === '/' ? '/' : `${state.cwd}/${args[0]}`.replace(/\/+/g, '/');
        if (state.fs[dest]) {
          state.cwd = dest;
          println(`Now in ${dest}`);
        } else {
          errorLine('Folder not found');
        }
        break;

      case 'cat':
        const file = `${state.cwd}/${args[0]}`.replace(/\/+/g, '/');
        if (state.files[file]) {
          if (file === '/readme.txt') {
            println(state.files[file], true, null, true);
          } else {
            printMultiline(state.files[file]);
          }
        } else {
          errorLine('File not found');
        }
        break;

      case 'clear':
        out.innerHTML = '';
        break;

      case 'hint':
        println('Try: cat readme.txt → cd /proxy_penny → cat world.txt');
        break;

      default:
        errorLine('Unknown command');
    }

    prompt();
  }

  function println(text = '', nl = true, color = null, allowHtml = false) {
    const content = allowHtml ? text : escapeHtml(text);
    out.insertAdjacentHTML(
      'beforeend',
      `<div style="color:${color || '#00ff9c'}">${content}</div>`
    );
    out.scrollTop = out.scrollHeight;
  }

  function printMultiline(text) {
    text.split('\n').forEach(line => println(line));
  }

  function prompt() {
    println(`\n${state.cwd} >`, false, '#569CD6');
  }

  function section(title) {
    println(`=== ${title.toUpperCase()} ===`, true, '#4FC1FF');
  }

  function userLine(text) {
    println(`> ${text}`, true, '#FFFFFF');
  }

  function errorLine(text) {
    println(`Error: ${text}`, true, '#F44747');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    }[c]));
  }
}