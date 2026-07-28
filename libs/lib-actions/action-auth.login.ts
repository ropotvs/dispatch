'use server';

import { DbUsers } from '@dispatch/db';
import { TypeDtoSession } from '@dispatch/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function actionAuthLogin(props: {
  email: string;
  password: string;
}): Promise<boolean> {
  const users = await DbUsers.read();
  const user = users.find(
    (item) => item.email === props.email && item.password === props.password,
  );

  if (!user) {
    return false;
  }

  const session: TypeDtoSession = {
    id: user.id,
    name: user.name,
    handle: user.handle,
    image: user.image,
  };

  (await cookies()).set('dispatch:session', JSON.stringify(session), {
    httpOnly: true,
  });

  redirect('/');
}
