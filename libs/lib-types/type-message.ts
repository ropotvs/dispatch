import { EnumMessageTag } from '@dispatch/enums';
import { TypeUser } from './type-user';

export type TypeMessage = {
  id: string;
  author: TypeUser;
  text: string;
  tag: EnumMessageTag;
  timestamp: string;
};
