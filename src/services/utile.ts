import { request } from 'umi';

export async function findDictionary(dicname: string) {
  return request(`/api/common/findDictionary?dicname=${dicname}`);
}
export async function findDictionaryValueEnumByDicnameCache(dicname: string) {
  return request(`/api/common/findDictionaryValueEnumByDicnameCache?dicname=${dicname}`);
}
export async function findDictionaryValueEnumByDicname(dicname: string) {
  return  request(`/api/common/findDictionaryValueEnumByDicname?dicname=${dicname}`);
}
