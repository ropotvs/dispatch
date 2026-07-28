'use server';

import { TypeDtoSession } from '@dispatch/types';
import { cookies } from 'next/headers';

export async function actionSessionGet(): Promise<TypeDtoSession | null> {
  const sessionString = (await cookies()).get('dispatch:session')?.value;
  if (!sessionString) {
    return null;
  }

  try {
    return JSON.parse(sessionString);
  } catch {
    return null;
  }
}
