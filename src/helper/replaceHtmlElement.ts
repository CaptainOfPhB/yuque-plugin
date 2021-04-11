export const replaceCardElement = (document: Document) => {
  const cardElements = document.querySelectorAll('card');
  cardElements.forEach(function (cardElement: Element) {
    const name = cardElement.getAttribute('name');
    switch (name) {
      case 'codeblock':
        {
          const [encodedContent] = cardElement.getAttribute('value')!.split('data:').reverse();
          const { mode, code } = JSON.parse(decodeURIComponent(encodedContent)) as { mode: string; code: string };
          const preElement = document.createElement('pre');
          const codeElement = document.createElement('code');
          codeElement.setAttribute('data-language', mode);
          codeElement.innerText = code;
          preElement.appendChild(codeElement);
          cardElement.replaceWith(preElement);
        }
        break;
    }
  });
};

export const replacePElement = (document: Document) => {
  const pElements = document.querySelectorAll('p');
  pElements.forEach(function (pElement: Element) {
    if (pElement.childNodes.length === 1 && pElement.childNodes[0].nodeName === 'BR') {
      pElement.replaceWith(document.createElement('br'));
    }
  });
};

export const normalizeOlElement = (document: Document) => {
  const olElements = document.querySelectorAll('ol');
  olElements.forEach(function (olElement: Element, index: number) {
    if (index === 0) {
      olElement.setAttribute('start', '1');
    } else {
      const prevOlElement = olElements[index - 1];
      const listItemsLength = prevOlElement.querySelectorAll('li').length;
      const start = listItemsLength + Number(prevOlElement.getAttribute('start')!);
      olElement.setAttribute('start', start.toString());
    }
  });
};

export const insertH1Element = (document: Document, title: string) => {
  const brElement = document.createElement('br');
  const h1Element = document.createElement('h1');
  h1Element.innerHTML = title;
  document.body.prepend(brElement);
  document.body.prepend(h1Element);
};
