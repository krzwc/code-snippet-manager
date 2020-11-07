import React from "react";
import ReactDOM from "react-dom";
import App, { UnconnectedApp } from "..";
import * as enzyme from "enzyme";
import { store } from "../../../Store";
import { Provider } from "react-redux";
import * as actions from "../../../actions";
import PickTech from "../../../components/PickTech";

describe("App component", () => {
  test("connects to the store, receives default props and renders properly", () => {
    const app = enzyme.mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(app.find("select").exists()).toBe(true);
    expect(app.find("div").text()).toContain("javascript");
  });
});

describe("UnconnectedApp component", () => {
  test("sets the selectedTech prop as the `value` prop on the Picker component", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedTech: "a",
      items: []
    };
    const wrapper = enzyme.shallow(<UnconnectedApp {...props} />);
    const PickTechComp = wrapper.find(PickTech);
    expect(PickTechComp.props().value).toBe(props.selectedTech);
  });
  //   test("dispatches the correct actions on select option change", () => {
  //     const props = {
  //       isFetching: false,
  //       dispatch: jest.fn(),
  //       selectedTech: "a",
  //       items: []
  //     };
  //     const otherSelectedTech = "b";
  //     // actions.selectTech = {
  //     //   selectTech: jest.fn(),
  //     //   fetchSnippetsIfNeeded: jest.fn()
  //     // };
  //     const wrapper = enzyme.shallow(<UnconnectedApp {...props} />);
  //     const instance = wrapper.instance() as any;
  //     // console.log(wrapper.debug());
  //     // expect(app.props().value).toEqual("a");
  //     instance.fetchSnippets(otherSelectedTech);
  //     expect(props.dispatch.mock.calls.length).toBe(2);
  //   });
});
