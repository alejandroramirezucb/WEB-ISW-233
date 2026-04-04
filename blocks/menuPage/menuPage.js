export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch('/blocks/menuPage/menuPage.css');
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();

    this.onMenuChange = () => {
      this.render();
    };
  }

  // when the component is attached to the DOM
  connectedCallback() {
    const template = document.getElementById('menu-page-template');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener('appmenuchange', this.onMenuChange);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('appmenuchange', this.onMenuChange);
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector('#menu').innerHTML = '';
      for (let product of app.store.menu) {
        const item = document.createElement('product-item');
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector('#menu').appendChild(item);
      }
    } else {
      this.root.querySelector('#menu').innerHTML = 'Loading...';
    }
  }
}

customElements.define('menu-page', MenuPage);
