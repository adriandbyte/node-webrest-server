import { envs } from './config/envs';
import { AppRouter } from './presentation/routes';
import { Server } from './presentation/server';




(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    router: AppRouter.routes
  });

  server.start();
}