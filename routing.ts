import { Router } from "https://deno.land/x/oak/mod.ts";
import userService from "./services/user.service.ts";

const router = new Router();

/**
 * Get a list of all users
 */
router.get("/users", async context => {
  const data = await Deno.readFile("./db/users.json");
  const decoder = new TextDecoder();
  const decodedData = decoder.decode(data);
  context.response.body = JSON.parse(decodedData);
});

/**
 * Get a particular user
 */
router.get("/user/:id", async (context: any) => {
  const userId = context.params.id;
  const user = await userService.getUser(userId);
  context.response.body = user;
});

export default router;
