import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routing.ts"; // routes and handlers
import mainMiddleware from "./middlewares/main.ts"; // containing the request logging and error handlers

const app = new Application();

app.use(mainMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on 4000...`);

await app.listen(`127.0.0.1:4000`);
