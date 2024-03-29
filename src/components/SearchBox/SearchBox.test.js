import React from "react";
import { shallow } from "enzyme";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("Handle searching", () => {
    const onChange = jest.fn();
    const props = {
      term: "",
      onChange: onChange
    };
    const wrapper = shallow(<SearchBox {...props} />);
    expect(wrapper.find("input").length).toEqual(1);
    wrapper.simulate("change", "bret");
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("bret");
  });
});
