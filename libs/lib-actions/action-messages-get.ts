import { mockMessages } from '@dispatch/mocks';
import { TypeMessage } from '@dispatch/types';

export function actionMessagesGet(): Promise<TypeMessage[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockMessages), 2000),
  );
}
