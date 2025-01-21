// theme switcher
const switcher = document.getElementById('themeswitcher');

// set initial value
switcher.value = localStorage.getItem('theme') || '';

switcher.addEventListener('change', () => {
  const theme = switcher.value;
  localStorage.setItem('theme', theme);
  document.documentElement.dataset.theme = theme;
});
