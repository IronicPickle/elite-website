import dotenv from "dotenv";
import { NodeServer } from "./server/NodeServer";

console.log("\n[Server] Starting...\n");

const env: dotenv.DotenvConfigOutput = dotenv.config(); // Pull env vars from ' .env ' file
if(env.error) console.log("No environment file, using defaults");

const nodeServer = new NodeServer();
nodeServer.start().then(() => {
  console.log("\n[Server] Started in:", nodeServer.environment, "mode");
  console.log("[Server] Listening on:", nodeServer.port, "\n");
}).catch(console.error);
