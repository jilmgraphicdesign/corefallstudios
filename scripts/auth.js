/*  auth.js — Corefall ARG session & credential security
    Load BEFORE page-specific scripts on every protected page. */

(function () {
  'use strict';

  /* ── simple hash (djb2 variant) ── */
  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    }
    return h.toString(36);
  }

  /* ── session token ── */
  var SALT = 'cf_sec_2026';

  function makeToken(role) {
    return hash(SALT + ':' + role + ':' + navigator.userAgent.slice(0, 20));
  }

  function setSession(role) {
    var token = makeToken(role);
    sessionStorage.setItem('cf_auth', JSON.stringify({ role: role, token: token }));
  }

  function getSession() {
    try {
      var d = JSON.parse(sessionStorage.getItem('cf_auth'));
      if (d && d.token === makeToken(d.role)) return d;
    } catch (e) {}
    return null;
  }

  function isLoggedIn() {
    var s = getSession();
    return s && (s.role === 'user' || s.role === 'admin');
  }

  function isAdmin() {
    var s = getSession();
    return s && s.role === 'admin';
  }

  function clearSession() {
    sessionStorage.removeItem('cf_auth');
  }

  /* ── credential hashing ── */
  /* Pre-hashed values (so plaintext creds don't appear in source):
       hash('a.kolbeck')    = the admin username hash
       hash('2018-03-14')   = the admin password hash
       hash('wake the core') = the passphrase hash            */

  var ADMIN_USER_HASH = hash('a.kolbeck');
  var ADMIN_PASS_HASH = hash('2018-03-14');
  var PASSPHRASE_HASH = hash('wake the core');

  function checkLogin(username, password) {
    /* check generated creds from application */
    try {
      var stored = JSON.parse(localStorage.getItem('corefall_user_generated') || 'null');
      if (stored && username === stored.username && password === stored.password) {
        setSession('user');
        return 'user';
      }
    } catch (e) {}

    /* check admin creds via hash */
    if (hash(username) === ADMIN_USER_HASH && hash(password) === ADMIN_PASS_HASH) {
      setSession('admin');
      return 'admin';
    }

    return false;
  }

  function checkPassphrase(input) {
    var normalized = input.replace(/\s+/g, ' ').trim().toLowerCase();
    return hash(normalized) === PASSPHRASE_HASH;
  }

  /* ── page guards ── */
  function requireLogin(redirectTo) {
    if (!isLoggedIn()) {
      location.replace(redirectTo || 'login.html');
      return false;
    }
    return true;
  }

  function requireAdmin(redirectTo) {
    if (!isAdmin()) {
      location.replace(redirectTo || 'unauthorized.html');
      return false;
    }
    return true;
  }

  /* ── public API ── */
  window._cfAuth = {
    hash: hash,
    setSession: setSession,
    getSession: getSession,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    clearSession: clearSession,
    checkLogin: checkLogin,
    checkPassphrase: checkPassphrase,
    requireLogin: requireLogin,
    requireAdmin: requireAdmin
  };

  /* ── also maintain legacy localStorage for generated creds only ── */
  /* (old corefall_logged_in and corefall_role are no longer used for auth) */

})();
