'use server';

import { TypeDtoUser } from '@dispatch/types';
import { actionUsersGet } from './action-users.get';

export async function actionUsersMeGet(): Promise<TypeDtoUser> {
  const users = await actionUsersGet();

  return users[0];
}
