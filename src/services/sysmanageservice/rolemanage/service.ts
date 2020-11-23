import request from 'umi-request';
import { TableListParams, TableListItem } from './data.d';

export async function getRoleList(params?: TableListParams) {
  return request('/api/rolemanage/getRoleList', {
    method: 'POST',
    data: { params },
  });
}

export async function saveRole(params: TableListItem) {
  return request('/api/rolemanage/saveRole', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
