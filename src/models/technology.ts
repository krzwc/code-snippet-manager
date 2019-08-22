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
    slug: "name",
    unique: true
  }
});

technologySchema.statics.findTechnologyNameById = async function(id) {
  const technology = await mongoose.model("Technology").findOne({
    _id: id
  });
  return technology;
};

technologySchema.pre("remove", function(next) {
  this.model("Snippet").deleteMany({ technology: this._id }, next);
});

const Technology = mongoose.model<TechnologyModel>(
  "Technology",
  technologySchema
);

export default Technology;
