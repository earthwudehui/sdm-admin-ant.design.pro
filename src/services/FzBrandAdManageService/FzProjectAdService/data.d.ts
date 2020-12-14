export interface TableListItem {
  id: number;
  brandId: string;
  projectId: string;
  adName: string;
  status: string;
  remark: string;
  pictureUrl: string;
}

export interface TableListParams {
  xxmc: string;
  projectName: string;
  adName: string;

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
