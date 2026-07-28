import { EnumMessageTag } from '@dispatch/enums';
import { TypeFieldDate } from './type-field-date';
import { TypeFieldSelect } from './type-field-select';
import { TypeFieldTag } from './type-field-tag';

export type TypeFormFeedFilter = {
  dateFrom: TypeFieldDate;
  dateTo: TypeFieldDate;
  tag: TypeFieldTag<EnumMessageTag | null>;
  authorId: TypeFieldSelect<string | null>;
};
