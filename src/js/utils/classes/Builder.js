export default class Builder {

  static #defaultRootElement = document.querySelector('body');

  static #rootElement

  static init(rootElement = Builder.#defaultRootElement) {
    Builder.#rootElement = rootElement;
  }

  static render(renderedElement, node = Builder.#rootElement) {

    if (node === Builder.#rootElement) {
      node.innerHTML = renderedElement;
    } else {
      node.outerHTML = renderedElement;
    }

    renderedElement?.listenEvents?.(renderedElement.props);
    return this;
  }


}