export interface Props {
    formik : any
    handleSubmit: () => any
};

export interface Fields {
    email   : string
    password: string
};

export interface Handlers {
    handleSubmit: () => any
};

export interface Validation {
    errors : any
    touched: any
};