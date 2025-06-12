// menu enhancements
const
  mainmenu = document.querySelector('nav.menu'),
  menuopener = document.querySelector('nav.menu details');

// close menu on body click
document.addEventListener('click', e => {

  const t = e.target.closest('nav');
  if (t !== mainmenu && menuopener.open) menuopener.removeAttribute('open');

});
