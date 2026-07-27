import { EnumMessageTag } from '@dispatch/enums';
import { TypeMessage } from '@dispatch/types';
import { mockUserAda, mockUserMarco, mockUserPriya } from './mock-users';

export const mockMessages: TypeMessage[] = [
  {
    id: 'm-1',
    author: mockUserAda,
    text: 'Shipped the new filter bar — tag + date now sync to the URL so any view is bookmarkable. Feedback welcome.',
    tag: EnumMessageTag.Product,
    timestamp: '2m',
  },
  {
    id: 'm-2',
    author: mockUserMarco,
    text: 'Is the empty-state copy too dry? Thinking we add a nudge to post the first message.',
    tag: EnumMessageTag.Design,
    timestamp: '18m',
  },
  {
    id: 'm-3',
    author: mockUserPriya,
    text: 'Reminder: standup moves to 10:30 starting next week.',
    tag: EnumMessageTag.Announce,
    timestamp: '1h',
  },
];
