(function(){
  var form = document.getElementById('loginForm');
  var msg = document.getElementById('msg');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var u = document.getElementById('u').value.trim();
    var p = document.getElementById('p').value.trim();

    var result = window._cfAuth && window._cfAuth.checkLogin(u, p);

    if (result) {
      location.href = 'intranet.html';
    } else {
      msg.textContent = 'Invalid. Hint: use your generated login (from application) or passwords are your hire date.';
    }
  });
})();
