import request from 'umi-request';
import { TableListParams } from './data.d';
import { TableListItem } from '@/services/FzBrandAdManageService/FzProjectAdService/data';

export async function query(params?: TableListParams) {
  return request('/api/analysis/fzprojectad/queryList', {
    method: 'POST',
    data: { params },
  });
}

export async function save(params: TableListItem) {
  return request('/api/analysis/fzprojectad/save', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function update(params: TableListItem) {
  return request('/api/analysis/fzprojectad/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
