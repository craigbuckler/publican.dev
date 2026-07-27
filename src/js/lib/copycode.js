// copy functionality for code blocks
if (navigator.clipboard) {

  Array.from( document.querySelectorAll('pre:has([class^="language-"])') )
    .forEach(code => {

      // focusable code block
      code.tabIndex = 0;

      // keyboard event
      code.addEventListener('keydown', e => {

        if (e.key === 'Enter' || e.key === ' ') toClipboard(e);

      });

      // click event
      code.addEventListener('click', e => {

        const pre = e?.target?.closest('pre');
        if (pre && e.clientX > pre.getBoundingClientRect().right - 45) toClipboard(e);

      });

      // remove animation
      code.addEventListener('animationend', e => e.target.classList.remove(e.animationName));

    });

}

// copy code block
async function toClipboard(e) {

  const
    pre = e?.target?.closest('pre'),
    text = pre?.textContent?.trim();

  if (!text) return;

  e.preventDefault();

  try {
    await navigator.clipboard.writeText(text);
    pre.classList.add('copied');
  } catch (err) {
    console.log(err);
  }

}
