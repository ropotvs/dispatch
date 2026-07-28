import { EnumMessageTag } from '@dispatch/enums';

export type TypeDbMessage = {
  id: string;
  createdAt: string;
  tag: EnumMessageTag;
  text: string;
  authorId: string;
};
