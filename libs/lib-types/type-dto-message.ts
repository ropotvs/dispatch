import { EnumMessageTag } from '@dispatch/enums';
import { TypeDtoUser } from './type-dto-user';

export type TypeDtoMessage = {
  id: string;
  text: string;
  tag: EnumMessageTag;
  createdAt: string;
  author: TypeDtoUser;
};
