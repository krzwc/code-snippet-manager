import "dotenv/config";
import * as express from "express";
import config from "./config/config";
import * as cors from "cors";
import routes from "./routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", routes());

if (require.main === module) {
  app.listen(config.server.port, () => {
    console.log("server started at http://localhost:" + config.server.port);
  });
}

export default app;
