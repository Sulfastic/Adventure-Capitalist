class ViewStore {
  setProperty(name, value) {
    Object.defineProperty(this, name, {
      get() {
        return value;
      },
    });
  }
}

const viewStore = new ViewStore();

export default viewStore;
