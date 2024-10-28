import { ValidationError } from '../error/ValidationError';
import { zodSchemaForType } from './zodSchemaForType';

export class Validator<T> {
  constructor(private schema: ReturnType<typeof zodSchemaForType<T>>) {}

  validate(data: unknown) {
    try {
      return this.schema.parse(data);
    } catch (err) {
      throw new ValidationError('Unexpected input', { cause: err });
    }
  }
}
