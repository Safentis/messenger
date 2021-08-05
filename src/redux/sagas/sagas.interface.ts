export interface RequestProps<T> {
    payload: T
}

export interface EnterSagaProps<T = any> {
    payload: {
      values: T;
      formik: any; 
      history: any;
    };
  }