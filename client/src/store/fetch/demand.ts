import axios from "./axios";

export interface DemandListParams {
  page: number;
  pageSize: number;
}

export function getDemandList(params: DemandListParams) {
  return axios.get("/demand/list", { params: params });
}
