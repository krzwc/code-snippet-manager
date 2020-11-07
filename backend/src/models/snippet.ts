import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-generator";
import { SnippetModel } from "./types";

mongoose.plugin(slug);

const snippetSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technology: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technology"
  },
  slug: {
    type: String,
    slug: ["techName", "description"],
    unique: true
  }
});

const Snippet = mongoose.model<SnippetModel>("Snippet", snippetSchema);

export default Snippet;
