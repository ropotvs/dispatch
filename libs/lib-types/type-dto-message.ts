import { EnumMessageTag } from '@dispatch/enums';
import { TypeDtoUser } from './type-dto-user';

export type TypeDtoMessage = {
  id: string;
  author: TypeDtoUser;
  text: string;
  tag: EnumMessageTag;
  timestamp: string;
};
