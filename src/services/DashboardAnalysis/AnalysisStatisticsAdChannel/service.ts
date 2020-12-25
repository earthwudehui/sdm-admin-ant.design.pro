import request from 'umi-request';
import { TableListParamsChannel } from './data.d';

export async function queryByAdStatistics(params?: TableListParamsChannel) {
  return request('/api/analysis/analysisStatisticsAdChannel/queryByAdStatistics', {
    method: 'POST',
    data: { params },
  });
}
export async function queryByAd(params?: TableListParamsChannel) {
  return request('/api/analysis/analysisStatisticsAdChannel/queryByAd', {
    method: 'POST',
    data: { params },
  });
}
export async function queryByAdChannelId(id: number) {
  return await request(`/api/analysis/analysisStatisticsAdChannel/queryByAdChannelId?id=${id}`);
}

export async function queryBrandChannelJump(params?: TableListParamsChannel) {
  return request('/api/analysis/analysisStatisticsAdChannel/queryBrandChannelJump', {
    method: 'POST',
    data: { params },
  });
}
