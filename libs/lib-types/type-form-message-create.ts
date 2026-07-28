import { EnumMessageTag } from '@dispatch/enums';
import { TypeFieldSelect } from './type-field-select';

export type TypeFormMessageCreate = {
  tag: TypeFieldSelect<EnumMessageTag>;
  text: string;
};
