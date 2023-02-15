import { defaultParameterChecker } from '../DefaultParameterChecker';
import 'reflect-metadata';

export function bindEvent(
  event = defaultParameterChecker('event'),
  selector = defaultParameterChecker('selector'),
  prevent = true
) {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(
      'bindEvent',
      {
        event,
        selector,
        prevent,
        propertyKey,
      },
      Object.getPrototypeOf(target),
      propertyKey
    );
    return descriptor;
  };
}
