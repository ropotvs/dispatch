'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { actionSessionGet } from './action-session.get';

export async function actionAuthLogout(): Promise<void> {
  const session = await actionSessionGet();
  if (!session) {
    throw new Error('Unauthorized');
  }

  (await cookies()).delete('dispatch:session');
  redirect('/auth/login');
}
