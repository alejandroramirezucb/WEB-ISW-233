import { undoLastCartAction } from './Order.js';

function isTypingOnInput(event) {
  const tagName = event.target?.tagName?.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    event.target?.isContentEditable
  );
}

export function installShortcuts(router) {
  window.addEventListener('keydown', async (event) => {
    if (isTypingOnInput(event)) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      await undoLastCartAction();
      return;
    }

    if (event.altKey && event.key === '1') {
      event.preventDefault();
      router.go('/');
      return;
    }

    if (event.altKey && event.key === '2') {
      event.preventDefault();
      router.go('/products');
      return;
    }

    if (event.altKey && event.key === '3') {
      event.preventDefault();
      router.go('/order');
    }
  });
}
