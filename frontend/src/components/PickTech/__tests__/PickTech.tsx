import React from "react";
import PickTech from "..";
import * as enzyme from "enzyme";

describe("PickTech component", () => {
  test("renders options properly", () => {
    const value = "a";
    const options = ["a", "b"];
    const onChange = () => {};

    const pickTech = enzyme.shallow(
      <PickTech value={value} onChange={onChange} options={options} />
    );
    expect(pickTech.find("option").exists()).toBe(true);
  });
  test("changes options properly", () => {
    const value = "a";
    const options = ["a", "b"];
    const onChange = jest.fn();

    const pickTech = enzyme.mount(
      <PickTech value={value} onChange={onChange} options={options} />
    );
    // other way: pickTech.find("select option[value='b']").simulate("change");
    pickTech.find("select").simulate("change", { target: { value: "b" } });
    expect(onChange).toBeCalledWith("b");
    // console.log(pickTech.find("select").props());
    // expect(pickTech.find("select").props().value).toBe("b");
    // expect(pickTech.find("h1").text()).toContain("b");
  });
});
