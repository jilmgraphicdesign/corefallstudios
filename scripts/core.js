
// Timed "bleed" page transition + audio WebAudio API
(function(){
  const bleed = document.getElementById('bleed');
  function transitionTo(href){
    if (!bleed) { location.href = href; return; }
    bleed.classList.add('active');
    playGlitch();
    setTimeout(()=> location.href = href, 450);
  }
  document.querySelectorAll('[data-bleed]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      transitionTo(href);
    });
  });

  // glitch sound
  let ctx;
  function playGlitch(){
    try{
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(80 + Math.random()*180, ctx.currentTime);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.25);
    }catch(e){}
  }

  window._corefall = { playGlitch };
})();

(() => {
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.main-nav a[href]').forEach(a => {
    const href = a.getAttribute('href').split('#')[0].toLowerCase();
    const base = href.split('/').pop(); // <-- handle ../ paths
    if (base === here) a.setAttribute('aria-current','page');
  });
})();
// News category filter
(() => {
  const bar = document.querySelector('.news-filters');
  if (!bar) return;

  const btns = [...bar.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('article.card')];

  function apply(key) {
    const k = (key || 'all').toLowerCase();
    btns.forEach(b => b.classList.toggle('is-active', b.dataset.filter === k));

    cards.forEach(card => {
      const cats = (card.dataset.cat || '').split(',').map(s => s.trim().toLowerCase());
      const show = k === 'all' || cats.includes(k);
      card.classList.toggle('hidden', !show);
    });

    // (no scroll jump)
    if (k === 'all') history.replaceState(null, '', location.pathname + location.search);
    else history.replaceState(null, '', `#cat=${k}`);
  }

  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    apply(btn.dataset.filter);
  });

  const match = location.hash.match(/#cat=([\w-]+)/i);
  apply(match ? match[1] : 'all');
})();

// Hide the scroll cue after the user scrolls a bit
(() => {
  const cue = document.querySelector('.scroll-cue');
  if (!cue) return;
  let hidden = false;
  window.addEventListener('scroll', () => {
    if (!hidden && window.scrollY > 80) {
      cue.classList.add('is-hidden');
      hidden = true;
    }
  }, { passive: true });
})();
// Scroll avatar sequence
(() => {
  const hero = document.querySelector('.hero-video');
  const frames = [...document.querySelectorAll('.avatar-frame')];
  if (!hero || frames.length < 2) return;

  // small screens
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 640;
  if (reduce) { frames.forEach((f,i)=>f.classList.toggle('is-active', i===0)); return; }

  let start = 0, end = 0;

  function measure(){
    const rect = hero.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    start = top + rect.height * 0.10;      
    end   = top + rect.height * 0.90;       
  }

  function update(){
    const y = window.scrollY + window.innerHeight * 0.25; 
    const pRaw = (y - start) / (end - start);
    const p = Math.max(0, Math.min(1, pRaw));
    const idx = Math.min(frames.length - 1, Math.floor(p * frames.length));
    frames.forEach((img,i) => img.classList.toggle('is-active', i === idx));
  }

  window.addEventListener('resize', () => { measure(); update(); }, {passive:true});
  window.addEventListener('scroll', update, {passive:true});
  document.addEventListener('DOMContentLoaded', () => { measure(); update(); });
})();
/* ============================================================
   avatar carousel
   ============================================================ */
(() => {
  const car    = document.querySelector('.avatar-carousel');
  if (!car) return;

  const frames = [...car.querySelectorAll('.avatar-slide')];
  if (frames.length < 2) return;                       

  let i = frames.findIndex(f => f.classList.contains('is-active'));
  if (i < 0) { i = 0; frames[0].classList.add('is-active'); }

  const show = n => {
    frames[i].classList.remove('is-active');
    i = (n + frames.length) % frames.length;
    frames[i].classList.add('is-active');
  };

  car.querySelector('.avatar-nav.next') ?.addEventListener('click', () => show(i + 1));
  car.querySelector('.avatar-nav.prev') ?.addEventListener('click', () => show(i - 1)); 
})();

// === nav highlighting ===
(() => {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  // Map file labels
  const LABELS = {
    'index.html':        'Home',
    'news.html':         'News',
    'story.html':        'Story',
    'team.html':         'Team',
    'apply.html':        'Careers',
    'login.html':        'Employee Login',
    'admin.html':        'Admin',
    'intranet.html':     'Ops Hub',
    'help-terminal.html':'Terminal Help'
  };

  
  const overrideKey = (document.body.getAttribute('data-nav') || '').trim();
  const overrideFile = overrideKey ? `${overrideKey}.html` : null;

  
  const path = location.pathname.replace(/\/+$/, '');
  let base = path.split('/').pop() || 'index.html';
  if (!base.includes('.')) base += '.html';

  const target = (overrideFile && LABELS[overrideFile]) ? overrideFile : base;
  const wantLabel = LABELS[target] || document.title || 'This Page';

  
  const links = [...nav.querySelectorAll('a[href]')];
  const activeLink = links.find(a => {
    const href = a.getAttribute('href').split('#')[0].split('?')[0];
    const hrefBase = href.split('/').pop();
    return hrefBase.toLowerCase() === target.toLowerCase();
  });

  if (activeLink) {
    activeLink.setAttribute('aria-current', 'page');
  } else {
    // non-clickable nav 
    const pill = document.createElement('span');
    pill.className = 'nav-pill-current';
    pill.setAttribute('aria-current', 'page');
    pill.textContent = wantLabel;
    nav.appendChild(pill);
  }
})();



