export default function isSet(values: string | string[]) {
  if (Array.isArray(values)) return values.every((value: string) => value.length > 0);
  return values.length > 0;
}
