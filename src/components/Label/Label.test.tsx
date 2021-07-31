import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Label from "./Label";

describe("<Label />", () => {
  let component: any;
  let wrapper: any;
  let label: any;

  describe("Standart component", () => {
    beforeEach(() => {
      component = <Label>text</Label>;
      wrapper = shallow(component);
      label = wrapper.find("label");
    });

    it("JSX element Label has one label element", () => {
      expect(label).toHaveLength(1);
    });

    it("JSX element Label has standart class", () => {
      expect(label.hasClass("label")).toBeTruthy();
    });

    it("JSX element Label has text content", () => {
      expect(label.text()).toBe("text");
    });
  });

  describe("Custom component", () => {
    beforeEach(() => {
      component = (
        <Label className="label-input-email">
          text
          <input />
        </Label>
      );
      wrapper = shallow(component);
      label = wrapper.find("label");
    });

    it('JSX element Label has both classNames, example "label" and "label-input-email"', () => {
      expect(label.hasClass("label")).toBeTruthy();
      expect(label.hasClass("label-input-email")).toBeTruthy();
    });

    it("JSX element Label has children, example input and text", () => {
      expect(wrapper.find("input")).toHaveLength(1);
      expect(label.text()).toBe("text");
    });
  });
});
