import * as mongoose from "mongoose";
import { SnippetModel } from "./types";

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
  }
});

const Snippet = mongoose.model<SnippetModel>("Snippet", snippetSchema);

export default Snippet;
