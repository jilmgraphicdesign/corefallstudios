
(function(){
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('msg');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const u = document.getElementById('u').value.trim();
    const p = document.getElementById('p').value.trim();

    let ok = false;
    let role = 'user';

    // Generated login from application 
    try {
      const stored = JSON.parse(localStorage.getItem('corefall_user_generated')||'null');
      if (stored && u === stored.username && p === stored.password) {
        ok = true;
        role = 'user';
      }
    } catch(e){}

    // Admin fallback (Arne Kolbeck hire date)
    const adminUser = "a.kolbeck";
    const adminPass = "2018-03-14"; // <time datetime> in news.html
    if (!ok && u === adminUser && p === adminPass) {
      ok = true;
      role = 'admin';
    }

    if (ok) {
      localStorage.setItem('corefall_logged_in','1');
      localStorage.setItem('corefall_role', role);
      location.href = 'intranet.html';
    } else {
      msg.textContent = 'Invalid. Hint: use your generated login (from application) or passwords are your hire date.';
    }
  });
})();
