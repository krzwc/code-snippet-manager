import "dotenv/config";
import * as express from "express";
import config from "./config/config";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes";

mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.connection.on("error", err => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

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
