import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";
import config from "./config/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world!"
  });
});

if (require.main === module) {
  app.listen(config.server.port, () => {
    console.log("server started at http://localhost:" + config.server.port);
  });
}

export default app;
