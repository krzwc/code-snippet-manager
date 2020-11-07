import * as actions from "..";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { initialState } from "../../utils/initialState";

const tech = "javascript";

describe("action creators", () => {
  test("selectTech creates an action", () => {
    const exectedAction = {
      type: actions.SELECT_TECH,
      tech
    };
    expect(actions.selectTech(tech)).toEqual(exectedAction);
  });
  test("requestSnippets creates an action", () => {
    const exectedAction = {
      type: actions.REQUEST_SNIPPETS,
      tech
    };
    expect(actions.requestSnippets(tech)).toEqual(exectedAction);
  });
  test("receiveSnippets creates an action", () => {
    const stingifiedJSON = JSON.stringify({
      data: { snippetsByTechnology: [] }
    });
    const json = JSON.parse(stingifiedJSON);
    const expectedAction = {
      type: actions.RECEIVE_SNIPPETS,
      tech,
      snippets: []
    };
    expect(actions.receiveSnippets(tech, json)).toEqual(expectedAction);
  });
  test("isFetching is false at start hence shouldFetchSnippets returns true", () => {
    expect(actions.shouldFetchSnippets(initialState)).toEqual(true);
  });
});

// async action creators
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("thunk action creators", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test("fetchSnippets dispatches requestSnippets and receiveSnippets", () => {
    fetchMock.getOnce(`http://localhost:4000/api/${tech}`, {
      body: {
        data: {
          snippetsByTechnology: [
            {
              _id: "string",
              code: "string",
              description: "string",
              technology: "string",
              slug: "string",
              __v: "number"
            }
          ]
        }
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: actions.REQUEST_SNIPPETS, tech },
      {
        type: actions.RECEIVE_SNIPPETS,
        tech,
        snippets: [
          {
            _id: "string",
            code: "string",
            description: "string",
            technology: "string",
            slug: "string",
            __v: "number"
          }
        ]
      }
    ];
    const store = mockStore({
      selectedTech: "",
      snippetsByTech: { isFetching: false, items: [] }
    });

    return store.dispatch<any>(actions.fetchSnippets(tech)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("fetchSnippetsIfNeeded dispatches requestSnippets and receiveSnippets when isFetching: false", () => {
    fetchMock.getOnce(`http://localhost:4000/api/${tech}`, {
      body: {
        data: {
          snippetsByTechnology: [
            {
              _id: "string",
              code: "string",
              description: "string",
              technology: "string",
              slug: "string",
              __v: "number"
            }
          ]
        }
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: actions.REQUEST_SNIPPETS, tech },
      {
        type: actions.RECEIVE_SNIPPETS,
        tech,
        snippets: [
          {
            _id: "string",
            code: "string",
            description: "string",
            technology: "string",
            slug: "string",
            __v: "number"
          }
        ]
      }
    ];
    const store = mockStore({
      selectedTech: "",
      snippetsByTech: { isFetching: false, items: [] }
    });

    return store.dispatch<any>(actions.fetchSnippetsIfNeeded(tech)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("fetchSnippetsIfNeeded returns 'undefined' when isFetching: true", () => {
    fetchMock.getOnce(`http://localhost:4000/api/${tech}`, {
      body: {
        data: {
          snippetsByTechnology: [
            {
              _id: "string",
              code: "string",
              description: "string",
              technology: "string",
              slug: "string",
              __v: "number"
            }
          ]
        }
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: actions.REQUEST_SNIPPETS, tech },
      {
        type: actions.RECEIVE_SNIPPETS,
        tech,
        snippets: [
          {
            _id: "string",
            code: "string",
            description: "string",
            technology: "string",
            slug: "string",
            __v: "number"
          }
        ]
      }
    ];
    const store = mockStore({
      selectedTech: "",
      snippetsByTech: { isFetching: true, items: [] }
    });

    return expect(
      store.dispatch<any>(actions.fetchSnippetsIfNeeded(tech))
    ).toBe(undefined);
  });
});
