'use server';

import { TypeUser } from '@dispatch/types';
import { actionUsersGet } from './action-users.get';

export async function actionUsersMeGet(): Promise<TypeUser> {
  const users = await actionUsersGet();

  return users[0];
}
