import { Server, ServerCredentials } from '@grpc/grpc-js';

export function launch(
  server: Server,
  credentials: ServerCredentials = ServerCredentials.createInsecure(),
  host = '0.0.0.0',
  port = process.env.PORT ?? '9000'
): Promise<number> {
  return new Promise((resolve, reject) => {
    server.bindAsync(`${host}:${port}`, credentials, (err, port) => {
      if (err) reject(err);
      resolve(port);
    });
  });
}

export function shutdown(server: Server, force: boolean = false): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (force) {
      server.forceShutdown();
      resolve();
    } else {
      server.tryShutdown((err) => {
        if (err) reject(err);
        resolve();
      });
    }
  });
}

export function shutdownWithProcessControls(server: Server, force: boolean = false): Promise<void> {
  return shutdown(server, force)
    .then(() => {
      process.exit();
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export function bindProcessEvents(server: Server) {
  process.on('SIGINT', () => shutdownWithProcessControls(server, true));
  process.on('SIGTERM', () => shutdownWithProcessControls(server, false));
  process.on('SIGQUIT', () => shutdownWithProcessControls(server));
  process.on('unhandledRejection', (err) => {
    console.error(err);
    shutdownWithProcessControls(server);
  });
}
