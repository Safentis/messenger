import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Input from "./Input";

describe("<Input />", () => {
  let component: any;
  let wrapper: any;

  describe("Standart component", () => {
    beforeEach(() => {
      component = <Input />;
      wrapper = shallow(component);
    });

    it('Component has one element "input"', () => {
      expect(wrapper.find("input")).toHaveLength(1);
    });

    it('Component has standart class "input"', () => {
      expect(wrapper.find("input").hasClass("input")).toBeTruthy();
    });
  });

  describe("Custom component", () => {
    beforeEach(() => {
      component = <Input className="input-text" type="text" />;
      wrapper = shallow(component);
    });

    it("We can to add attrs type", () => {
      expect(wrapper.find("input").props()["type"]).toBe("text");
    });

    it("We can to add attrs class", () => {
      expect(wrapper.find("input").hasClass("input-text")).toBeTruthy();
    });
  });
});
