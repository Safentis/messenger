import { Message } from '../../screens/Root.interface';

export interface Props extends Message {
  photo: string;
  index: string | number;
}
