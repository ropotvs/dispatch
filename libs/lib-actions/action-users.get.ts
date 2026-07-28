'use server';

import { TypeDtoUser } from '@dispatch/types';

export async function actionUsersGet(): Promise<TypeDtoUser[]> {
  const hardcodedDbUsers: TypeDtoUser[] = [
    { id: 'u-ada', name: 'Ada Lovelace', handle: '@ada_l' },
    { id: 'u-marco', name: 'Marco Diaz', handle: '@marco' },
    { id: 'u-priya', name: 'Priya Shah', handle: '@priya' },
  ];

  return hardcodedDbUsers;
}
