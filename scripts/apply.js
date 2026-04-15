(function(){
  const form = document.getElementById('applyForm');
  if (!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const first = (document.getElementById('firstName').value || '').trim();
    const last  = (document.getElementById('lastName').value || '').trim();
    if (!first || !last) { alert('Please enter first and last name.'); return; }

    const username = `${first[0].toLowerCase()}.${last.toLowerCase().replace(/\s+/g,'')}`;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    const password = `${yyyy}-${mm}-${dd}`;

    localStorage.setItem('corefall_user_generated', JSON.stringify({ username, password }));

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:9999';

    const box = document.createElement('div');
    box.style.cssText = 'background:#0f1525;border:1px solid #1c2750;border-radius:16px;padding:28px 32px;max-width:400px;width:90%;text-align:center;font-family:inherit;color:#dce4f5';

    box.innerHTML =
      `<h3 style="margin:0 0 6px;color:#58c1ff">Corefall Studios HR</h3>` +
      `<p style="font-size:13px;color:#6b7fa3;margin:0 0 16px">Welcome to the team.</p>` +
      `<p style="margin:0 0 4px">Your login credentials:</p>` +
      `<p style="font-family:monospace;font-size:15px;margin:4px 0"><strong>${username}</strong></p>` +
      `<p style="font-family:monospace;font-size:15px;margin:4px 0 16px">password: <strong>${password}</strong></p>` +
      `<button class="button" style="min-width:120px">OK</button>`;

    box.querySelector('button').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
})();