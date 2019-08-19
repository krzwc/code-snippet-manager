import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";
import config from "./config/config";
import * as cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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
