import 'reflect-metadata';

export function controller(...selectors) {
  const elements = selectors.map((selector) => document.querySelector(selector));

  return function (construtor) {
    const constructorOriginal = construtor;

    const constructorNovo = function () {
      const instance = new constructorOriginal(...elements);
      Object.getOwnPropertyNames(constructorOriginal.prototype).forEach((property) => {
        if (Reflect.hasMetadata('bindEvent', instance, property)) {
          associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property));
        }
      });
    };

    constructorNovo.prototype = constructorOriginal.prototype;

    return constructorNovo;
  };
}
function associaEvento(instance, metadado) {
  document.querySelector(metadado.selector).addEventListener(metadado.event, (event) => {
    if (metadado.prevent) event.preventDefault();

    instance[metadado.propertyKey](event);
  });
}
