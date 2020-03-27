import { ValidationError } from '@nestjs/common';
export function getValidationMessage(error: ValidationError[]) {
  let message = '';
  for (let i = 0; i < error.length; i++) {
    const { constraints = {} } = error[i];
    for (const k in constraints) {
      message = constraints[k];
      break;
    }
    if (message) break;
  }
  return message;
}
