import * as mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

technologySchema.plugin(URLSlugs("name", { field: "name", update: true }));

technologySchema.pre("remove", function(next) {
  this.model("Snippet").deleteMany({ technology: this._id }, next);
});

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;
