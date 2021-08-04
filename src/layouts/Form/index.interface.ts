import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FormikErrors, FormikTouched } from "formik";

export interface Props {
  formik: any;
  fields: FieldsParams[];
  buttonParams: ButtonParams;
  successMessage?: string;
  failureMessage?: string;
}

export interface Handlers {
  handleSubmit: () => void;
}

export interface Validation {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  status: boolean;
}

export interface FieldsParams {
  name: string;
  type: string;
}

export interface ButtonParams {
  text: string;
  icon: IconDefinition;
}