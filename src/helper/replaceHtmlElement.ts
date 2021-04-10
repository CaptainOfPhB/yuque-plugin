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
