import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-generator";
import { TechnologyModel } from "./types";

mongoose.plugin(slug);

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  slug: {
    type: String,
    slug: "name"
  }
});

// technologySchema.plugin(URLSlugs("name", { field: "slug", update: true }));

technologySchema.pre("remove", function(next) {
  this.model("Snippet").deleteMany({ technology: this._id }, next);
});

const Technology = mongoose.model<TechnologyModel>(
  "Technology",
  technologySchema
);

export default Technology;
