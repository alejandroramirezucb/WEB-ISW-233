import Router from './services/Router.js';

import Store from './services/Store.js';
import { loadData } from './services/Menu.js';
import { installShortcuts } from './services/KeyboardShortcuts.js';

import './blocks/menuPage/menuPage.js';
import './blocks/productItem/productItem.js';
import './blocks/orderPage/orderPage.js';

globalThis.app = {};

app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', () => {
  loadData();
  app.router.init();
  installShortcuts(app.router);
});

window.addEventListener('appcartchange', (event) => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
