import { Dispatch } from "redux";

export type OneTech = {
  _id: string;
  code: string;
  description: string;
  technology: string;
  slug: string;
  __v: number;
};

export type Tech = Array<OneTech>;

export type AppStateSnippets = {
  isFetching: boolean;
  items: Tech;
};

export type AppStateTech = string;

export type AppState = {
  selectedTech: AppStateTech;
  snippetsByTech: AppStateSnippets;
};

type GenericAppProps<T> = {
  selectedTech: string;
  isFetching: boolean;
  items: T;
  dispatch: Dispatch<any>;
};

export type AppProps = GenericAppProps<Tech>;
