import request from 'umi-request';
import { TableListParams } from './data.d';
import { TableListItem } from '@/services/sysmanageservice/usermanage/data';

export async function queryUser(params?: TableListParams) {
  return request('/api/sysmanage/usermanage/queryUserList', {
    method: 'POST',
    data: { params },
  });
}

export async function saveUser(params: TableListItem) {
  return request('/api/sysmanage/usermanage/saveUser', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListItem) {
  return request('/api/sysmanage/usermanage/updateUser', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
