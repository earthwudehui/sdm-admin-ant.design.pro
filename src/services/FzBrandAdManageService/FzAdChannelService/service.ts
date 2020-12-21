import request from 'umi-request';
import { TableListParamsChannel } from './data.d';
import { TableListItemChannel } from '@/services/FzBrandAdManageService/FzAdChannelService/data';

export async function queryChannel(params?: TableListParamsChannel) {
  return request('/api/analysis/fzAdChannel/queryList', {
    method: 'POST',
    data: { params },
  });
}

export async function saveChannel(params: TableListItemChannel) {
  return request('/api/analysis/fzAdChannel/save', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateChannel(params: TableListItemChannel) {
  return request('/api/analysis/fzAdChannel/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
export async function deleteChannel(id: string) {
  return request(`/api/analysis/fzAdChannel/delete?id=${id}`);
}
