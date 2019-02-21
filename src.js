// I want elements that:
// 		contain other elements
// 		contain text
// 		is an image
// Will currently take script elements?
elemWorthwhile = ({ element, children }) => {
  // console.log(element, children);
  return children !== null || element.textContent.trim() || element.src;
};

salientAttributes = elem => {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
  let {
    children,
    tagName,

    textContent,
    innerText,

    src,
    style,

    className, // classList, Trying className ATM

    dataset,
    title,
    href,
    target,
    id,
    name,
    rel
  } = elem;

  //Common attributes
  let output = {
    src,
    className, // classList,
    dataset,
    tagName,
    title,
    id,
    name
  };

  // If there are any inline rules:
  //	Save text representation (The CSSStyleDeclaration serialises with all empty attributes)
  if (style.length) {
    output.style = style.cssText;
  }

  if (href) {
    output.href = href;
    output.target = target;
    output.rel = rel;
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
  }

  // Add text if it doesn't have child elements
  // This probably needs to be refined.
  // e.g. inline formatting elements.
  if (!children) {
    output.textContent = textContent;
    output.innerText = innerText;
    // console.log(output, elem);
  }

  return output;
};

processANode = el => {
  children = [...el.children].map(processANode).filter(elemWorthwhile);
  return {
    element: el,
    salientAttributes: salientAttributes(el),
    children: children.length ? children : null
  };
};

let c = document.querySelector(".Content");
