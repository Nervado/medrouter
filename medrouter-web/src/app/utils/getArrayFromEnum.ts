import { capitalizeAndRemoveUnderscores } from "./capitalizeAndRemoveUnderscore";

export function getArrayFromEnum(
  enumerable: any
): Array<{ [keys: string]: any }> {
  const generateObj = (key: string, value: any) => {
    const obj = {};
    obj["label"] = capitalizeAndRemoveUnderscores(value);
    obj["value"] = value;
    return obj;
  };
  const result = [];
  for (const key in enumerable) {
    if (enumerable.hasOwnProperty(key)) {
      const element = enumerable[key];
      result.push(generateObj(key, element));
    }
  }
  return result;
}
