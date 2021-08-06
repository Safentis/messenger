import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import { useFormik } from "formik";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Form from "./index";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("formik");

describe("<Form />", () => {
  //* Props that takes Form
  let component: any;
  let wrapper: any;
  const formik: any = {
    status: false,
    touched: {
      email: false,
      password: false,
    },
    errors: {
      email: "email",
      password: "password",
    },
    initialValue: {
      email: "",
      password: "",
    },
    onSubmit: jest.fn(),
    validationSchema: {},
    getFieldProps: jest.fn(),
    getStatus: jest.fn(),
  };

  describe("Quantity of the rendered components", () => {

    const buttonParams = {text: '', icon: faEnvelope}
    const fields = [
        { name: "email", type: "text" },
        { name: "password", type: "password" },
    ];

    beforeEach(() => {
      component = <Form buttonParams={buttonParams}  formik={formik} fields={fields}/>;
      wrapper = shallow(component);
    });

    it("Component rendered and has 1 form", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it("Component has 1 SuccessMessage", () => {
      expect(wrapper.find("SuccessMessage")).toHaveLength(0);
    });

    it("Component has 2 labels", () => {
      expect(wrapper.find("Label")).toHaveLength(2);
    });

    it("Component has 2 inputs", () => {
      expect(wrapper.find("Input")).toHaveLength(2);
    });

    it("Component has 2 errorMessage", () => {
      expect(wrapper.find("ErrorMessage")).toHaveLength(1);
    });

    it("Component has 1 button", () => {
      expect(wrapper.find("Button")).toHaveLength(1);
    });
  });
});
