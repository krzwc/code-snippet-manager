import "dotenv/config";
import * as express from "express";
import config from "./config/config";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes";
import models from "./models";

//checking db
const createTechnologyWithSnippets = async () => {
  const tech1 = new models.Technology({
    name: "javascript"
  });

  const tech2 = new models.Technology({
    name: "Visual studio"
  });

  const snippet1 = new models.Snippet({
    code: "this is a snippet with event delegation",
    description: "event delegation",
    technology: tech1.id
  });

  const snippet2 = new models.Snippet({
    code: "copy line snippet",
    description: "copy line",
    technology: tech2.id
  });

  const snippet3 = new models.Snippet({
    code: "comment line snippet",
    description: "comment line",
    technology: tech2.id
  });

  await snippet1.save();
  await snippet2.save();
  await snippet3.save();

  await tech1.save();
  await tech2.save();

  // await tech2.remove();
};
// end checking db

mongoose
  .connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(async () => {
    createTechnologyWithSnippets();
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
