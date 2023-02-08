export class ProxyFactory {
  static create(objecto, props, armadilha) {
    return new Proxy(objecto, {
      get(target, prop, receiver) {
        if (ProxyFactory._isFuncao(target[prop]) && props.includes(prop)) {
          return function () {
            console.log(`Disparou uma armadilha de ${prop}`);
            target[prop].apply(target, arguments);
            armadilha(target);
          };
        } else {
          return target[prop];
        }
      },
      set(target, prop, value, receiver) {
        const update = Reflect.set(target, prop, value);

        if (props.includes(prop)) armadilha(target);
        return update;
      },
    });
  }
  static _isFuncao(fn) {
    return typeof fn == typeof Function;
  }
}
