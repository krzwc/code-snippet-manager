import * as mongoose from "mongoose";

export type TechnologyModel = mongoose.Document & {
  name: string;
  slug?: string;
};

export type SnippetModel = mongoose.Document & {
  code: string;
  description: string;
  technology: typeof mongoose.Schema.Types.ObjectId;
  slug?: string;
};
