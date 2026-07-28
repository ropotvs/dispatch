import { TypeDbMessage, TypeDbUser } from '@dispatch/types';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const dbDir = path.join(process.cwd(), 'db');

function connect<TRow>(table: string) {
  const file = path.join(dbDir, `${table}.json`);

  const read = async (): Promise<TRow[]> => {
    try {
      return JSON.parse(await readFile(file, 'utf-8')) as TRow[];
    } catch {
      return [];
    }
  };

  const write = async (rows: TRow[]): Promise<void> => {
    await mkdir(dbDir, { recursive: true });
    await writeFile(file, JSON.stringify(rows, null, 2));
  };

  return { read, write };
}

export const DbMessages = connect<TypeDbMessage>('messages');
export const DbUsers = connect<TypeDbUser>('users');
