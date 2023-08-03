import {notFound} from "../../controllers/home-controller.js";

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

  navigate(url, failCallback = notFound) {

    const options = this.routes.get(url);

    if (options) {
      const { method, action } = options

      if (method === 'GET' && url !== location.pathname) {
        location.replace(url);
      }

      return action();
    }

    return failCallback();
  }

  init() {
    this.navigate(location.pathname, notFound);
  }

  get routes() {
    return this.#routes;
  }

  static combineRouters(...routers) {
    const combinedRouter = new Router();

    for (let router of routers) {
      for (let [key, value] of router.routes) {
        combinedRouter.routes.set(key, value);
      }
    }

    return combinedRouter;
  }
}