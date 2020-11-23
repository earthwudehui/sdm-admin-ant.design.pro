export interface TableListItem {
  id: number;
  name: string;
  password: string;
  realName: string;
  mobile: string;
  status?: string;
  roleId?: string;

}

export interface TableListParams {
  id?: number;
  name?: string;
  password?: string;
  realName?: string;
  mobile?: string;
  status?: string;
  loginDate?: Date;
  roleId?: string;

  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
