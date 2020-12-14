import request from 'umi-request';
import { TableListParams } from './data.d';
import { TableListItem } from '@/services/FzBrandAdManageService/FzBrandProjectService/data';

export async function query(params?: TableListParams) {
  return request('/api/analysis/fzbrandproject/queryList', {
    method: 'POST',
    data: { params },
  });
}

export async function save(params: TableListItem) {
  return request('/api/analysis/fzbrandproject/save', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function update(params: TableListItem) {
  return request('/api/analysis/fzbrandproject/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
export async function queryFzBrandProjectByBrandId(brandId: string) {
  return await request(`/api/analysis/fzbrandproject/queryFzBrandProjectByBrandId?brandId=${brandId}`);
}
