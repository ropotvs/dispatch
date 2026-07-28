import { EnumMessageTag } from '@dispatch/enums';
import { TypeFieldSelect } from './type-field-select';

export type TypeFormMessageUpdate = {
  tag: TypeFieldSelect<EnumMessageTag>;
  text: string;
};
