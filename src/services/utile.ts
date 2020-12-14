import { request } from 'umi';

export async function findDictionary(dicname: string) {
  return request(`/api/common/findDictionary?dicname=${dicname}`);
}
export async function findDictionaryByProFormSelect(dicname: string) {
  const a = request(`/api/common/findDictionaryByProFormSelect?dicname=${dicname}`);
  return a;
}
export async function findDictionaryByProFormSelect1(dicname: string) {
  return await request(`/api/common/findDictionaryByProFormSelect1?dicname=${dicname}`);
}
