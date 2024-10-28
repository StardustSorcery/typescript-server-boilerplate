import { createUserProfileRouter } from './controller/UserProfileController';
import { bindProcessEvents, createGeneralErrorHandler, launch } from '@/lib/rest/server-utils';
import express from 'express';

async function main() {
  // server
  const app = express();
  app.use(express.json());
  app.use('/user-profiles/', createUserProfileRouter());
  app.use(createGeneralErrorHandler());

  // launch
  const server = await launch(app).then(([port, server]) => {
    console.log(`[REST Server] start (port: ${port})`);
    return server;
  });
  bindProcessEvents(server);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
