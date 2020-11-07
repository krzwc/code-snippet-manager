import { combineReducers, Reducer } from "redux";
import { SELECT_TECH, REQUEST_SNIPPETS, RECEIVE_SNIPPETS } from "../actions";
import { AppStateSnippets, AppStateTech } from "../containers/App/types";
import { defaultTech } from "../utils/defaultTech";

export const selectedTech: Reducer<AppStateTech> = (
  state = defaultTech,
  action
) => {
  switch (action.type) {
    case SELECT_TECH:
      return action.tech;
    default:
      return state;
  }
};

export const snippetsByTech: Reducer<AppStateSnippets> = (
  state = {
    isFetching: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case REQUEST_SNIPPETS:
      return Object.assign({}, state, { isFetching: true });
    case RECEIVE_SNIPPETS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.snippets
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  selectedTech,
  snippetsByTech
});

export default rootReducer;
