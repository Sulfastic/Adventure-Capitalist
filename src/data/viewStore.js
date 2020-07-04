export default new (class ViewStore {
  setProperty(name, value) {
    Object.defineProperty(this, name, {
      get() {
        return value;
      },
    });
  }
})();
