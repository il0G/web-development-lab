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
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });

  // ---------- 3D flip карт ----------
  // Хулгана байгаа төхөөрөмж дээр flip-ийг CSS (:hover) бүрэн зохицуулна.
  // Хулгана байхгүй (touch) үед карт дээр товшиход эргэнэ/буцна.
  if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    });
  }
})();
