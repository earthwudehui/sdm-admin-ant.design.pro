export interface TableListItem {
  id: number;
  brandId: number;
  projectName: string;
  status: string;
  remark: string;
}

export interface TableListParams {
  xxmc: string;
  projectName: string;

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
