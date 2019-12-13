export class VDOM {
  createElement(tagName, { attrs = {}, children = [] } = {}) {
    return {
      tagName,
      attrs,
      children,
    };
  }

  mount($node, $target) {
    $target.replaceWith($node);
    return $node;
  };

  render({ tagName, attrs, children }) {
    const $el = document.createElement(tagName);

    for (const [k, v] of Object.entries(attrs)) {
      $el.setAttribute(k, v);
    }

    for (const child of children) {
      const $child = this.render(child);
      $el.appendChild($child);
    }

    return $el;
  };
}
