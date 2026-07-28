export function mapObjectFromQuery<TValue extends object>(
  param?: string,
): Partial<TValue> {
  try {
    const parsed: unknown = JSON.parse(param ?? '{}');
    if (typeof parsed !== 'object' || parsed === null) {
      return {};
    }

    return parsed as Partial<TValue>;
  } catch {
    return {};
  }
}
