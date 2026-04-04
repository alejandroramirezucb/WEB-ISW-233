import {
  canUndoCartAction,
  removeFromCart,
  undoLastCartAction,
} from '../../services/Order.js';

export default class OrderPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    this.styles = document.createElement('style');
    this.root.appendChild(this.styles);
    this.onCartChange = () => this.render();
    this.onHistoryChange = () => this.updateUndoButtonState();
  }

  async connectedCallback() {
    await this.loadCSS();
    this.render();
    window.addEventListener('appcartchange', this.onCartChange);
    window.addEventListener('apphistorychange', this.onHistoryChange);
  }

  disconnectedCallback() {
    window.removeEventListener('appcartchange', this.onCartChange);
    window.removeEventListener('apphistorychange', this.onHistoryChange);
  }

  async loadCSS() {
    try {
      const request = await fetch('/blocks/orderPage/orderPage.css');
      this.styles.textContent = await request.text();
    } catch (error) {
      this.styles.textContent = '';
    }
  }

  updateUndoButtonState() {
    const undoButton = this.root.querySelector('.order-page__undo');
    if (undoButton) {
      undoButton.disabled = !canUndoCartAction();
    }
  }

  render() {
    const cart = app.store.cart;
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    this.root.innerHTML = '';
    this.root.appendChild(this.styles);

    const section = document.createElement('section');
    section.className = 'order-page';

    const title = document.createElement('h1');
    title.className = 'order-page__title';
    title.textContent = 'Your order';

    const subtitle = document.createElement('p');
    subtitle.className = 'order-page__subtitle';
    subtitle.textContent = `Total products: ${totalItems}`;

    const shortcuts = document.createElement('p');
    shortcuts.className = 'order-page__hint';
    shortcuts.textContent =
      'Shortcut: Ctrl/Cmd + Z to undo | Alt+1 Home | Alt+2 Products | Alt+3 Order';

    const undoButton = document.createElement('button');
    undoButton.className = 'order-page__undo';
    undoButton.textContent = 'Undo last action';
    undoButton.disabled = !canUndoCartAction();
    undoButton.addEventListener('click', async () => {
      await undoLastCartAction();
      this.updateUndoButtonState();
    });

    const list = document.createElement('ul');
    list.className = 'order-page__list';

    if (cart.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'order-page__empty';
      empty.textContent = 'Your cart is empty.';
      section.append(title, subtitle, shortcuts, undoButton, empty);
      this.root.appendChild(section);
      return;
    }

    for (const item of cart) {
      const li = document.createElement('li');
      li.className = 'order-page__item';

      const label = document.createElement('span');
      label.className = 'order-page__item-label';
      label.textContent = `${item.product.title || item.product.name} x${item.quantity}`;

      const removeButton = document.createElement('button');
      removeButton.className = 'order-page__remove';
      removeButton.textContent = 'Remove 1';
      removeButton.addEventListener('click', async () => {
        await removeFromCart(item.product.id);
      });

      li.append(label, removeButton);
      list.appendChild(li);
    }

    section.append(title, subtitle, shortcuts, undoButton, list);
    this.root.appendChild(section);
  }
}

customElements.define('order-page', OrderPage);
