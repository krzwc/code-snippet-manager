import { AppState } from "../containers/App/types";
import { defaultTech } from "./defaultTech";

export const initialState: AppState = {
  selectedTech: defaultTech,
  snippetsByTech: { isFetching: false, items: [] }
};
