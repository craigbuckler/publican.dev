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
      if ( (window.matchMedia('(width > 1500px) and (height > 600px)')).matches ) details.setAttribute('open', '');
      details.appendChild( document.createElement('summary') ).textContent = title;
      details.appendChild(nav);

    }

  }

}

window.customElements.define('nav-heading', NavHeading);
