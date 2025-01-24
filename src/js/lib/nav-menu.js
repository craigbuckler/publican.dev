// menu enhancements
const menu = document.querySelector('nav.menu');

// close menu on body click
document.addEventListener('click', e => {

  const t = e.target.closest('nav');
  if (t === menu) return;

  const open = menu.querySelector('details[name][open]');
  if (open) open.removeAttribute('open');

});

// open main menu
menu.addEventListener('mouseover', e => {

  const t = e.target.closest('details[name]:not([open])');
  if (t) t.setAttribute('open', '');

});
