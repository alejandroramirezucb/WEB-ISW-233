const CART_KEY = 'web-isw-233-cart';

class LocalStorageAdapter {
  get(key) {
    return globalThis.localStorage.getItem(key);
  }

  set(key, value) {
    globalThis.localStorage.setItem(key, value);
  }

  remove(key) {
    globalThis.localStorage.removeItem(key);
  }
}

class MemoryStorageAdapter {
  constructor() {
    this.data = new Map();
  }

  get(key) {
    return this.data.get(key) ?? null;
  }

  set(key, value) {
    this.data.set(key, value);
  }

  remove(key) {
    this.data.delete(key);
  }
}

function getStorageAdapter() {
  try {
    if ('localStorage' in globalThis) {
      const probe = '__storage_probe__';
      globalThis.localStorage.setItem(probe, probe);
      globalThis.localStorage.removeItem(probe);
      return new LocalStorageAdapter();
    }
  } catch (error) {
    // ignore and use in-memory fallback
  }
  return new MemoryStorageAdapter();
}

export function createJSONStorage(key, adapter = getStorageAdapter()) {
  return {
    load(defaultValue) {
      const raw = adapter.get(key);
      if (!raw) {
        return defaultValue;
      }

      try {
        return JSON.parse(raw);
      } catch (error) {
        return defaultValue;
      }
    },

    save(value) {
      adapter.set(key, JSON.stringify(value));
    },

    clear() {
      adapter.remove(key);
    },
  };
}

export const cartStorage = createJSONStorage(CART_KEY);
