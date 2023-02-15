export function defaultParameterChecker(parameter) {
  throw new Error(`${parameter} e obrigatorio`);
}
