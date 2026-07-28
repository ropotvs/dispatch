'use server';

import { TypeUser } from '@dispatch/types';

export async function actionUsersGet(): Promise<TypeUser[]> {
  const hardcodedDbUsers: TypeUser[] = [
    { id: 'u-ada', name: 'Ada Lovelace', handle: '@ada_l' },
    { id: 'u-marco', name: 'Marco Diaz', handle: '@marco' },
    { id: 'u-priya', name: 'Priya Shah', handle: '@priya' },
  ];

  return hardcodedDbUsers;
}
