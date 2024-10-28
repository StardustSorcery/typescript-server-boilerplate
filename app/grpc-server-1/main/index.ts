import { createUserProfileGrpcService } from './service/UserProfileGrpcService';
import { bindProcessEvents, launch } from '@/lib/grpc/server-utils';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UserProfileServiceService } from '@stardustsorcery/proto-boilerplate/namespace1/app1/user/user_profile_grpc_pb';

async function main() {
  // server
  const server = new Server();

  server.addService(UserProfileServiceService, createUserProfileGrpcService());

  // credentials
  const credentials = ServerCredentials.createInsecure();

  // launch
  bindProcessEvents(server);
  await launch(server, credentials).then((port) => {
    console.log(`[gRPC Server] start (port: ${port})`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
