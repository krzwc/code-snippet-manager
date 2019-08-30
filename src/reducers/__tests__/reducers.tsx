import * as reducers from "..";
import rootReducer from "..";
import * as actions from "../../actions";
import { AnyAction } from "redux";
import { defaultTech } from "../../utils/defaultTech";
import { initialState } from "../../utils/initialState";

describe("reducers", () => {
  test("selectedTech returns defaultTech by default", () => {
    const act: AnyAction = { type: "" };
    expect(reducers.selectedTech(undefined, act)).toEqual(defaultTech);
  });
  test("selectedTech handles SELECT_TECH", () => {
    expect(
      reducers.selectedTech(defaultTech, {
        type: actions.SELECT_TECH,
        tech: "c#"
      })
    ).toEqual("c#");
  });
  test("snippetsByTech returns the initial state by default", () => {
    const act: AnyAction = { type: "" };
    expect(reducers.snippetsByTech(undefined, act)).toEqual(
      initialState.snippetsByTech
    );
  });
  test("snippetsByTech handles REQUEST_SNIPPETS", () => {
    expect(
      reducers.snippetsByTech(
        {
          isFetching: false,
          items: []
        },
        {
          type: actions.REQUEST_SNIPPETS
        }
      )
    ).toEqual({ isFetching: true, items: [] });
  });
  test("snippetsByTech handles RECEIVE_SNIPPETS", () => {
    expect(
      reducers.snippetsByTech(
        { isFetching: true, items: [] },
        {
          type: actions.RECEIVE_SNIPPETS,
          snippets: [
            {
              _id: "some-string",
              code: "some-string",
              description: "some-string",
              technology: "some-string",
              slug: "some-string",
              __v: 5
            }
          ]
        }
      )
    ).toEqual({
      isFetching: false,
      items: [
        {
          _id: "some-string",
          code: "some-string",
          description: "some-string",
          technology: "some-string",
          slug: "some-string",
          __v: 5
        }
      ]
    });
  });
  test("rootReducer returns the initial state by default", () => {
    const act: AnyAction = { type: "" };
    expect(rootReducer(undefined, act)).toEqual(initialState);
  });
  test("rootReducer handles SELECT_TECH", () => {
    expect(
      rootReducer(
        {
          selectedTech: defaultTech,
          snippetsByTech: {
            isFetching: false,
            items: [
              {
                _id: "some-string",
                code: "some-string",
                description: "some-string",
                technology: "some-string",
                slug: "some-string",
                __v: 5
              }
            ]
          }
        },
        {
          type: actions.SELECT_TECH,
          tech: "c#"
        }
      )
    ).toEqual({
      selectedTech: "c#",
      snippetsByTech: {
        isFetching: false,
        items: [
          {
            _id: "some-string",
            code: "some-string",
            description: "some-string",
            technology: "some-string",
            slug: "some-string",
            __v: 5
          }
        ]
      }
    });
  });
  test("rootReducer handles REQUEST_SNIPPETS", () => {
    expect(
      rootReducer(
        {
          selectedTech: defaultTech,
          snippetsByTech: {
            isFetching: false,
            items: []
          }
        },
        {
          type: actions.REQUEST_SNIPPETS,
          tech: "c#"
        }
      )
    ).toEqual({
      selectedTech: defaultTech,
      snippetsByTech: {
        isFetching: true,
        items: []
      }
    });
  });
  test("rootReducer handles RECEIVE_SNIPPETS", () => {
    expect(
      rootReducer(
        {
          selectedTech: "c#",
          snippetsByTech: {
            isFetching: true,
            items: []
          }
        },
        {
          type: actions.RECEIVE_SNIPPETS,
          tech: "c#",
          snippets: [
            {
              _id: "some-string",
              code: "some-string",
              description: "some-string",
              technology: "some-string",
              slug: "some-string",
              __v: 5
            }
          ]
        }
      )
    ).toEqual({
      selectedTech: "c#",
      snippetsByTech: {
        isFetching: false,
        items: [
          {
            _id: "some-string",
            code: "some-string",
            description: "some-string",
            technology: "some-string",
            slug: "some-string",
            __v: 5
          }
        ]
      }
    });
  });
});
