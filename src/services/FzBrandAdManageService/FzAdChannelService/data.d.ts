export interface TableListItemChannerl {
  id: number;
  brandId: string;
  channelId: string;
  adName: string;
  adId:number;
  channelType: string;
  channelName: string;
  startDate: string;
  endDate: string;
  status: string;
  remark: string;
}

export interface TableListParamsChannerl {
  id: number;


  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
