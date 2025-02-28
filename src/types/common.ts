export type FilterQueryParams = Record<string, number | string | boolean | undefined> 

export interface ApiPaginationResponse<DataType> {
  data: DataType[];
  last_page: number;
  total: number;
}

export interface ApiSingleResponse<DataType> {
  data: DataType
  status: boolean
  msg: string
}

export type IntergerBoolean = 0 | 1