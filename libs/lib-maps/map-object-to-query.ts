export function mapObjectToQuery(value: object): string {
  const entries = Object.entries(value).filter(
    ([, entry]) => entry !== null && entry !== undefined && entry !== '',
  );
  if (entries.length === 0) {
    return '';
  }

  return encodeURIComponent(JSON.stringify(Object.fromEntries(entries)));
}
