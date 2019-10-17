import express from "express";
import bodyParser from "body-parser";
import next from "next";
import path from "path";
import { Express } from "express-serve-static-core";
import Server from "next/dist/next-server/server/next-server";
import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";

export class NodeServer {

  public port: string;
  public environment: string | undefined;
  private dev: boolean;
  private dir: string;

  private app: Server;
  private server: Express;
  private handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery | undefined) => Promise<void>;

  constructor() {
    this.port = process.env.PORT || "8080";
    this.environment = process.env.NODE_ENV; // Node Environment
    this.dev = this.environment !== "production";
    this.dir = (this.dev) ? "./" : "./build";

    this.app = next({ dev: this.dev, dir: this.dir});
    this.server = express(); // Initialise express
    this.handle = this.app.getRequestHandler();

    const publicPath: string = path.join(__dirname, "../../public");
    this.server.use(express.static(publicPath));

    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());

  }

  start() {
    return new Promise((resolve, reject) => {
      const server = this.server;
      const port = this.port;
      this.app.prepare().then(() => {
        server.listen(port, () => {
          resolve(this);
        });

        server.all("*", (req: any, res: any, next: any) => {
          if(this.dev) console.log(req.method, req.url, "from", req.ip);
          this.handle(req, res);
        });
        
      }).catch((ex: { stack: any; }) => {
        console.error(ex.stack);
        process.exit(1);
      });
    });
  }

}
