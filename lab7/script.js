(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  // ---------- Харанхуй / гэрэлтэй горим ----------
  const themeBtn = document.querySelector('.theme-toggle');
  const KEY = 'theme';

  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = v => { try { localStorage.setItem(KEY, v); } catch { /* хадгалах боломжгүй */ } };

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  let saved = read();
  if (saved !== 'light' && saved !== 'dark') saved = null;

  themeBtn.hidden = false;
  applyTheme(saved || (media.matches ? 'dark' : 'light'));

  themeBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    saved = next;
    applyTheme(next);
    write(next);
  });

  // Хэрэглэгч өөрөө сонгоогүй бол үйлдлийн системийн тохиргоог дагана
  media.addEventListener('change', e => {
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  });

  // ---------- Гар утасны цэс ----------
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');

  function setMenu(open) {
    nav.classList.toggle('main-nav--open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('main-nav--open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('main-nav--open')) { setMenu(false); menuBtn.focus(); }
  });

  // ---------- 3D flip карт ----------
  document.querySelectorAll('.card').forEach(card => {
    const btn = card.querySelector('.card__flip');
    const front = card.querySelector('.card__face--front');
    const back = card.querySelector('.card__face--back');

    function setFlipped(on) {
      card.classList.toggle('card--flipped', on);
      btn.setAttribute('aria-pressed', String(on));
      front.inert = on;   // харагдахгүй тал дээр Tab/screen reader очихгүй
      back.inert = !on;
    }

    btn.hidden = false;
    setFlipped(false);
    btn.addEventListener('click', () => setFlipped(!card.classList.contains('card--flipped')));
  });
})();
