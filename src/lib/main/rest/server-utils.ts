import { PermissionDeniedError } from '../common/error/PermissionDeniedError';
import { ResourceNotFoundError } from '../common/error/ResourceNotFoundError';
import { UnauthenticatedError } from '../common/error/UnauthenticatedError';
import { ValidationError } from '../common/error/ValidationError';
import express, { ErrorRequestHandler } from 'express';
import { Server } from 'http';

export function launch(
  app: express.Express,
  host = '0.0.0.0',
  port = Number(process.env.PORT ?? '8080')
): Promise<[number, Server]> {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, host);

    server.on('error', reject);
    server.on('listening', () => {
      resolve([port, server]);
    });
  });
}

export function shutdown(server: Server, force: boolean = false): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (force) {
      server.closeAllConnections();
    }
    server.close((err) => {
      if (err) reject(err);
      resolve();
    });
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

export function createGeneralErrorHandler(): ErrorRequestHandler {
  return (err, _req, res, next) => {
    console.error(err);

    if (res.headersSent) {
      next(err);
    } else if (err instanceof ValidationError) {
      res.sendStatus(400);
    } else if (err instanceof UnauthenticatedError) {
      res.sendStatus(401);
    } else if (err instanceof PermissionDeniedError) {
      res.sendStatus(403);
    } else if (err instanceof ResourceNotFoundError) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  };
}
