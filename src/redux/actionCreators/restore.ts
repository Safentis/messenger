import { ActionCreator } from './actionCreators.interface';
import { EnterSagaProps } from '../sagas/sagas.interface';
import { FETCH_RESTORE_PASSWORD } from '../actions/restore';

export const requestRestorePassword = (data: EnterSagaProps): ActionCreator<EnterSagaProps> => {
  return {
    type: FETCH_RESTORE_PASSWORD,
    payload: data,
  };
};
