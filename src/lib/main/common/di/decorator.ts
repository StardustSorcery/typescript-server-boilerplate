import { container, injectable, singleton, Lifecycle } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';

function register<T = any>(
  constructor: constructor<T>,
  lifecycle: Lifecycle = Lifecycle.Transient
) {
  container.register<T>(constructor.name, { useClass: constructor }, { lifecycle });
}

export function Component<T = any>(constructor: constructor<T>) {
  register<T>(constructor, Lifecycle.Transient);
  injectable<T>()(constructor);
}

export function Singleton<T = any>(constructor: constructor<T>) {
  register<T>(constructor, Lifecycle.ContainerScoped);
  singleton<T>()(constructor);
}
