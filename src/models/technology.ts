import * as mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;
