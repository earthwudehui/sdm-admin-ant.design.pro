import request from 'umi-request';
import { TableListParamsChannerl } from './data.d';
import { TableListItemChannerl } from '@/services/FzBrandAdManageService/FzAdChannelService/data';

export async function queryChannerl(params?: TableListParamsChannerl) {
  return request('/api/analysis/fzAdChannel/queryList', {
    method: 'POST',
    data: { params },
  });
}

export async function saveChannerl(params: TableListItemChannerl) {
  return request('/api/analysis/fzAdChannel/save', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateChannerl(params: TableListItemChannerl) {
  return request('/api/analysis/fzAdChannel/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
