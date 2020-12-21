export interface TableListItemChannel {
  id: number;
  brandId: string;
  channelId: string;
  adName: string;
  adId:number;
  channelType: string;
  channelName: string;
  type: string
  startDate: string;
  endDate: string;
  status: string;
  remark: string;
}

export interface TableListParamsChannel {
  id: number;


  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
