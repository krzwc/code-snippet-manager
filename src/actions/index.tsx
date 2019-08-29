import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../containers/App/types";
import ENDPOINT from "../utils/endpoint";

export const SELECT_TECH = "SELECT_TECH";

export const selectTech: ActionCreator<Action> = (tech: string) => ({
  type: SELECT_TECH,
  tech
});

export const REQUEST_SNIPPETS = "REQUEST_SNIPPETS";

export const requestSnippets: ActionCreator<Action> = (tech: string) => ({
  type: REQUEST_SNIPPETS,
  tech
});

export const RECEIVE_SNIPPETS = "RECEIVE_SNIPPETS";

export const receiveSnippets: ActionCreator<Action> = (tech: string, json) => ({
  type: RECEIVE_SNIPPETS,
  tech,
  snippets: json.data.snippetsByTechnology
});

export const fetchSnippets: ActionCreator<
  ThunkAction<Promise<any>, AppState, undefined, Action>
> = (tech: string) => async dispatch => {
  dispatch(requestSnippets(tech));

  return fetch(ENDPOINT + `${tech}`)
    .then(response => response.json())
    .then(json => dispatch(receiveSnippets(tech, json)));
};

export const shouldFetchSnippets = (state: AppState) => {
  if (state.snippetsByTech.isFetching) {
    return false;
  }
  return true;
};

export const fetchSnippetsIfNeeded: ActionCreator<
  ThunkAction<Promise<void> | undefined, AppState, undefined, Action>
> = (tech: string) => (dispatch, getState) => {
  if (shouldFetchSnippets(getState())) {
    return dispatch(fetchSnippets(tech));
  }
};
