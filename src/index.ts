import "dotenv/config";
import * as express from "express";
import config from "./config/config";
import * as cors from "cors";
import * as mongoose from "mongoose";
import routes from "./routes";
import models from "./models";
import { handle404, catchErrors } from "./middleware/errorHandlers";

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
    technology: tech1.id,
    techName: tech1.name
  });

  const snippet2 = new models.Snippet({
    code: "copy line snippet",
    description: "copy line",
    technology: tech2.id,
    techName: tech2.name
  });

  const snippet3 = new models.Snippet({
    code: "comment line snippet",
    description: "comment line",
    technology: tech2.id,
    techName: tech2.name
  });

  await snippet1.save();
  await snippet2.save();
  await snippet3.save();

  await tech1.save();
  await tech2.save();

  // const fn = async () =>
  //   await mongoose.model("Technology").findById(tech1.id, function(err, obj) {
  //     console.log(obj.name);
  //   });

  // console.log(fn());
};
// end checking db

const eraseDatabaseOnSync = true;

mongoose
  .connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      await Promise.all([
        models.Technology.deleteMany({}),
        models.Snippet.deleteMany({})
      ]);
    }
    createTechnologyWithSnippets();
  });

mongoose.connection.on("error", err => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", routes());

app.use(handle404);
app.use(catchErrors);

if (require.main === module) {
  app.listen(config.server.port, () => {
    console.log("server started at http://localhost:" + config.server.port);
  });
}

export default app;
