/*
<nav-heading> web component
Creates outer <details> element when <nav> content is available.

<nav-heading title="Contents">
  <details>
    <summary>Contents</summary>

    <nav class="contents">
      <ol>...</ol>
    </nav>

  </details>
</nav-heading>
*/

class NavHeading extends HTMLElement {

  activeClass = 'active';

  constructor() {
    super();
  }

  // initialise
  connectedCallback() {

    const
      title = this.getAttribute('title'),
      nav = this.firstElementChild;

    // create <details> block
    if (title && nav) {

      const details = this.appendChild( document.createElement('details') );
      if ( (window.matchMedia('(width > 1365px) and (height > 600px)')).matches ) details.setAttribute('open', '');
      details.appendChild( document.createElement('summary') ).textContent = title;
      details.appendChild(nav);

    }

    this.#intersect();

  }


  // detect sections visible on the page
  #intersect() {

    // get in page links
    const link = new Map(
      Array.from( this.getElementsByTagName('a') )
        .map(
          a => a.pathname === location.pathname && a.hash ?
            [ document.querySelector(a.hash), a ] : []
        )
        .filter(a => a.length && a[0])
    );

    const observer = new IntersectionObserver(entries => {

      // get bound information
      for (const entry of entries) {

        const t = link.get(entry.target);
        if (!t) continue;

        if (entry.isIntersecting) {
          t.classList.add(this.activeClass);
        }
        else {
          t.classList.remove(this.activeClass);
        }

      }

    }, {
      threshold: 1
    });

    // observe links
    link.forEach((v, k) => observer.observe(k));

  }

}

window.customElements.define('nav-heading', NavHeading);
