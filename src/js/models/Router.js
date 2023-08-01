export default class Router {

  #routes = new Map();

  get(url, action) {
    this.#routes.set(url, {
      method: 'GET',
      action: action
    });
  }

  post(url, action) {
    this.#routes.set(url, {
      method: 'POST',
      action: action
    });
  }

  put(url, action) {
    this.#routes.set(url, {
      method: 'PUT',
      action: action
    });
  }

  delete(url, action) {
    this.#routes.set(url, {
      method: 'DELETE',
      action: action
    });
  }

  patch(url, action) {
    this.#routes.set(url, {
      method: 'PATCH',
      action: action
    });
  }

  options(url, action) {
    this.#routes.set(url, {
      method: 'OPTIONS',
      action: action
    });
  }

  navigate(url, failCallback = () => {}) {

    const options = this.#routes.get(url);

    if (options) {
      const { method, action } = options

      if (method === 'GET' && url !== location.pathname) {
        location.replace(url);
      }

      action();
    }

    failCallback();
  }

  init() {
    this.navigate(location.pathname);
  }
}