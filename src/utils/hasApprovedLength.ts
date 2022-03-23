export default function approvedLength(
  value: string,
  length: number,
  isBigger: boolean = false
): boolean {
  if (!isBigger) {
    return value.length < length ? true : false;
  } else {
    return value.length > length ? true : false;
  }
}
