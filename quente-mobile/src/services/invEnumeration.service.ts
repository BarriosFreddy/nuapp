import { ApiResponse } from "apisauce";
import { api } from "./api";
import { InvEnumeration } from "../models/inventory/inv-enumeration/InvEnumeration";

class InvEnumerationService {
  constructor() {}

  async findByCode(code: string) {
    const response: ApiResponse<any> = await api.apisauce.get(`inv-enumerations/code/${code}`);
    return response;
  }
}

const invEnumerationService = new InvEnumerationService();
export default invEnumerationService;
