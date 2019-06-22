import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  shallow(<App />);
});

it("had a p", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("p")).toExist();
});

it("had an a", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("a")).toHaveText("Learn React");
});
