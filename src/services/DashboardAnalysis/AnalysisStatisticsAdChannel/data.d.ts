export interface TableListItemChannel {
  id: number;
  adId: number;
  adName: string;
  pictureUrl: string;
  brandId: string;
  xxmc: string;
  channelName: string;
  statisticsDate: string;
  statisticsDateStart: string;
  statisticsDateEnd: string;
  channelType: string
  startDate: string;
  endDate: string;
  scanCodeUV: number;
  jumpUV: number;
}

export interface TableListParamsChannel {
  adName: string;
  statisticsDateStart: string;
  statisticsDateEnd: string;

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
