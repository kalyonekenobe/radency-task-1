export default class Builder {

  static #defaultRootElement = document.querySelector('body');

  static #rootElement

  static init(rootElement = Builder.#defaultRootElement) {
    Builder.#rootElement = rootElement;
  }

  static render(content, node = Builder.#rootElement) {
    node.innerHTML = content;
    return this;
  }
}