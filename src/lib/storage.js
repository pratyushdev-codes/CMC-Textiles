// Defensive localStorage wrapper — never throws, namespaced keys.

const NS = "cmc:";

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(NS + key);
    } catch {
      /* noop */
    }
  },
  clearAll() {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(NS))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      /* noop */
    }
  },
};
