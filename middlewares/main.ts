import logsService from "../services/logs.service.ts";
import userService from "../services/user.service.ts";

/** 
 * Code middleware of the application
 * To check the existence of header demoUser which would have a user id and execute the request handler in a try .. catch block for error handling
*/
export default async (context: any, next: () => Promise<void>) => {
  try {

    const requested = context.request.url.pathname;    
    const headers = context.request.headers;
    if (headers.get("demoUser")) {
      const userId = headers.get("demoUser");
      const requestingUser = await userService.getUser(userId);
      if (requestingUser) {       
        await logsService.addLog(requestingUser, requested);
        await next();
      } else {
        throw {
          message: "Invalid demo user id supplied"
        };
      }
    } else {
      throw {
        message: "User Id Header 'demoUser' not supplied"
      };
    }
  } catch (err) {
    context.response.status = 500;
    context.response.body = { msg: err.message };
  }
};
