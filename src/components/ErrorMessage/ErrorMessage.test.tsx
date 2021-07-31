import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import ErrorMessage from "./ErrorMessage";

describe("<ErrorMessage />", () => {
  describe("Standart component", () => {
    const component = <ErrorMessage />;
    const wrapper = shallow(component);

    //* Elements
    it("JSX element ErrorMessage has div", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    });

    it("JSX element ErrorMessage has p", () => {
      expect(wrapper.find("p")).toHaveLength(1);
    });

    it("JSX element ErrorMessage has element <FontAwesomeIcon />", () => {
      expect(wrapper.find("FontAwesomeIcon")).toHaveLength(1);
    });

    //* Classes
    it('JSX element ErrorMessage has className "error-message"', () => {
      expect(wrapper.find("div").hasClass("error-message")).toBeTruthy();
    });

    it(`
            JSX element ErrorMessage has both classNames 
            "error-message__text" and "error-message__text_red"
        `, () => {
      expect(wrapper.find("p").hasClass("error-message__text")).toBeTruthy();
      expect(
        wrapper.find("p").hasClass("error-message__text_red")
      ).toBeTruthy();
    });

    //* Text
    it('JSX element ErrorMessage has text with fontawesome icon "<FontAwesomeIcon />Error"', () => {
      expect(wrapper.find("p").text()).toBe("<FontAwesomeIcon />Error");
    });
  });

  describe("Custom component", () => {
    const component = (
      <ErrorMessage className="custom-class">Custom error message</ErrorMessage>
    );

    const wrapper = shallow(component);

    it('JSX element ErrorMessage has className "custom-class"', () => {
      expect(wrapper.find("div").hasClass("custom-class")).toBeTruthy();
    });

    //* Text
    it('JSX element ErrorMessage has text with fontawesome icon "<FontAwesomeIcon />Custom error message"', () => {
      expect(wrapper.find("p").text()).toBe(
        "<FontAwesomeIcon />Custom error message"
      );
    });
  });
});
