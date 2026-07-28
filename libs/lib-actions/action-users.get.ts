'use server';

import { DbUsers } from '@dispatch/db';
import { TypeDtoUser } from '@dispatch/types';

export async function actionUsersGet(): Promise<TypeDtoUser[]> {
  return DbUsers.read();
}
