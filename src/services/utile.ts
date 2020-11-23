import { request } from 'umi';

export async function findDictionary(dicname: string) {
  return request(`/api/common/findDictionary?dicname=${dicname}`);
}
