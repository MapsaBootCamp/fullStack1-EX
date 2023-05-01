export function exclude(dbObj: any, excludedFields: string[]): any {
  for (let key of excludedFields) {
    delete dbObj[key];
  }
  return dbObj;
}
