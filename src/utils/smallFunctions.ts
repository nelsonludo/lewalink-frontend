export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function getEnumValues<T extends Record<string, string | number>>(
  enumObj: T
): Array<T[keyof T]> {
  return Object.values(enumObj) as Array<T[keyof T]>;
}

export const getInitials = (fullname: string): string => {
  const [firstname, lastname] = fullname.split(" ");
  return `${firstname.slice(0, 1).toUpperCase()}${lastname
    .slice(0, 1)
    .toUpperCase()}`;
};
