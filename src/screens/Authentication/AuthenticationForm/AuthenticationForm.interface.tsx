import { FormikErrors, FormikTouched } from 'formik'

export interface Props {
  formik: any
}

export interface Handlers {
  handleSubmit: () => any;
}

export interface Validation {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  status: boolean;
}

export interface Fields {
  email: string;
  password: string;
}

export interface FieldsParams {
  name: string;
  type: string;
}