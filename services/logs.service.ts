import Log from "../interfaces/log.ts";
import User from "../interfaces/user.ts";

const logsService = {
  /**
   * Add a log to the log file 
   * Handle conditions to always add the log object in an array
   * @param requestingUser
   * @param requested
   */
  addLog: async function(requestingUser: User, requested: string) {
    const encoder = new TextEncoder();
    let newRequestLog = [];
    let newLog: Log = {
      createdAt: new Date(),
      user: requestingUser.username,
      requested
    };
    const data = await Deno.readFile(Deno.cwd() + "/db/requestLogger.json");
    const decoderr = new TextDecoder();
    let decodedData = decoderr.decode(data);

    if (decodedData.trim()) {
      newRequestLog = JSON.parse(decodedData);
    }
    newRequestLog.push(newLog);

    await Deno.writeFile(
      "./db/requestLogger.json",
      encoder.encode(JSON.stringify(newRequestLog))
    );
  }
};

export default logsService;
