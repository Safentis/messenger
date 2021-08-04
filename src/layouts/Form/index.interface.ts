import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FormikErrors, FormikTouched } from "formik";

export interface Props {
  formik: any;
  fields: FieldsParams[];
  buttonParams: ButtonParams;
}

export interface Handlers {
  handleSubmit: () => void;
}

export interface Validation {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  status: {
    state: boolean;
    message: string;
  };
}

export interface FieldsParams {
  name: string;
  type: string;
}

export interface ButtonParams {
  text: string;
  icon: IconDefinition;
}