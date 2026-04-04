import { cartStorage } from './Storage.js';

const initialCart = cartStorage.load([]);

const Store = {
  menu: null,
  cart: Array.isArray(initialCart) ? initialCart : [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == 'menu') {
      window.dispatchEvent(new Event('appmenuchange'));
    }
    if (property == 'cart') {
      cartStorage.save(value);
      window.dispatchEvent(new Event('appcartchange'));
    }
    return true;
  },
});

export default proxiedStore;
