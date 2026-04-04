import { getProductById } from '../Menu.js';

function cloneCart(cart) {
  return cart.map((item) => ({
    product: { ...item.product },
    quantity: item.quantity,
  }));
}

function addProductToCart(cart, product) {
  let found = false;
  const nextCart = cart.map((item) => {
    if (item.product.id !== product.id) {
      return item;
    }
    found = true;
    return { ...item, quantity: item.quantity + 1 };
  });

  if (!found) {
    nextCart.push({ product, quantity: 1 });
  }

  return nextCart;
}

function removeOneFromCart(cart, productId) {
  const nextCart = [];

  for (const item of cart) {
    if (item.product.id !== productId) {
      nextCart.push(item);
      continue;
    }

    if (item.quantity > 1) {
      nextCart.push({ ...item, quantity: item.quantity - 1 });
    }
  }

  return nextCart;
}

export class AddToCartCommand {
  constructor(productId, store) {
    this.productId = productId;
    this.store = store;
    this.previousCart = [];
    this.canUndo = true;
  }

  async execute() {
    const product = await getProductById(this.productId);
    if (!product) {
      this.canUndo = false;
      return;
    }

    this.previousCart = cloneCart(this.store.cart);
    this.store.cart = addProductToCart(this.store.cart, product);
  }

  async undo() {
    this.store.cart = cloneCart(this.previousCart);
  }
}

export class RemoveFromCartCommand {
  constructor(productId, store) {
    this.productId = productId;
    this.store = store;
    this.previousCart = [];
    this.canUndo = true;
  }

  async execute() {
    this.previousCart = cloneCart(this.store.cart);
    this.store.cart = removeOneFromCart(this.store.cart, this.productId);
  }

  async undo() {
    this.store.cart = cloneCart(this.previousCart);
  }
}
