import Log from "../interfaces/log.ts";
import User from "../interfaces/user.ts";

const userService = {
  /**
   * Get a particular user by id from the users json file
   * @param userId
   */
  getUser: async function(userId: string) {
    const data = await Deno.readFile(Deno.cwd() + "/db/users.json");

    const decoder = new TextDecoder();
    const decodedData = decoder.decode(data);
    const users = JSON.parse(decodedData);
    const requestingUser = users.find((user: any) => {
      return user.id == parseInt(userId);
    });
    return requestingUser;
  }
};

export default userService;
