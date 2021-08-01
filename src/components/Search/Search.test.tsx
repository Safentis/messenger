import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "@testing-library/jest-dom/extend-expect";

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";
import Search from "./Search";

describe("<Search />", () => {
  let component: any;
  let wrapper: any;
  let search: any;
  let inside: any;

  describe("Standart component", () => {
    beforeEach(() => {
      component = shallow(<Search />);
      wrapper = component;
      search = wrapper.find("Search");
      inside = search.dive();
    });

    it("Component is exist: ", () => {
      expect(search).toHaveLength(1);
    });

    it("Component has div element", () => {
      let inside = search.dive();
      expect(inside.find("div")).toHaveLength(1);
      expect(inside.find("div").hasClass("search")).toEqual(true);
    });

    it("Component has Button element", () => {
      expect(inside.find("Button")).toHaveLength(1);
      expect(inside.find("Button").hasClass("search__button")).toEqual(true);
    });

    it("Component has FontAwesomeIcon element", () => {
      expect(inside.find("FontAwesomeIcon")).toHaveLength(1);
      expect(
        inside.find("FontAwesomeIcon").hasClass("icon search__icon")
      ).toEqual(true);
    });

    it("Component has Input element", () => {
      expect(inside.find("Input")).toHaveLength(1);
      expect(inside.find("Input").hasClass("search__input")).toEqual(true);
    });
  });
});
