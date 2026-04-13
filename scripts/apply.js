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
    const password = `${yyyy}-${mm}-${dd}`; // ISO date

    // Persist to localStorage so login can accept it
    localStorage.setItem('corefall_user_generated', JSON.stringify({ username, password }));

    alert(
      "congratulations you've been hired, your log in is:\n" +
      `${username}\n` +
      `password: ${password}`
    );
  });
})();