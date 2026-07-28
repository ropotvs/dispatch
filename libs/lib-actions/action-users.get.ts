'use server';

import { DbUsers } from '@dispatch/db';
import { TypeDtoUser } from '@dispatch/types';
import { actionSessionGet } from './action-session.get';

export async function actionUsersGet(): Promise<TypeDtoUser[]> {
  const session = await actionSessionGet();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const users = await DbUsers.read();
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    handle: user.handle,
    image: user.image,
  }));
}
