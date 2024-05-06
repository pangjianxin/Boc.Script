export function getEnumSelectItem(data: any): string[] {
  const mapResult = Object.keys(data)
    .map((key) => data[key])
    .filter((value) => typeof value === "string") as string[];
  return mapResult;
}

export function getEnumDesc<T extends { [key: string]: any }>(
  mode: string,
  t: T
): string {
  const modes = mode.split(",");
  const mapResult = modes.map((it) => t[Number(it)]);
  return mapResult.join(",");
}

// 封装一个数字枚举转数组方法
export function enum2arr(valueEnum: any[] | Record<string, any>) {
  let values = Array.isArray(valueEnum) ? valueEnum : Object.values(valueEnum);
  // 如果 enum 值为 number 类型，ts 生成的 js 对象会同时包含枚举的名称，针对该情形需提出枚举名称
  const hasNum = values.some((v) => typeof v === "number");
  if (hasNum) {
    values = values.filter((v) => typeof v === "number");
  }
  return values;
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
  type?: string
): string {
  const value = fieldNames?.value ?? "value";
  const label = fieldNames?.label ?? "label";
  let filterData: { [key: string]: any } = {};
  if (Array.isArray(enumData))
    filterData = enumData.find((item: any) => item[value] === callValue);
  if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
  return filterData ? filterData[label] : "--";
}

export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}
