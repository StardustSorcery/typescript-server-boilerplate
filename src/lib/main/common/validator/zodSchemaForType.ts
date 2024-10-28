import { z } from 'zod';

export function zodSchemaForType<T>(args: z.ZodType<T, any, any>): typeof args {
  return args;
}
