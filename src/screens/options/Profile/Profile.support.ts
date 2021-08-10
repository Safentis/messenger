import { PASSWORD_VALIDATION_MESSAGE, REG_EXP_PASSWORD } from '../../../utils/consts';

export const required = (value: string) => (value ? undefined : 'Required');
export const password = (value: string) =>
  value?.match(REG_EXP_PASSWORD)
    ? undefined
    : value?.length < 8
    ? "Don't less then 8"
    : PASSWORD_VALIDATION_MESSAGE;
