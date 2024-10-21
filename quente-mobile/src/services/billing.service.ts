import { ApiResponse } from "apisauce";
import { api } from "./api";
import { Billing } from "../models/Billing";

class BillingService {
  constructor() {}

  async save(billing: Billing) {
    const response: ApiResponse<any> = await api.apisauce.post(`billings`, billing);

    return response;
  }

  async getBillingsByDate(date: string){
    const response: ApiResponse<any> = await api.apisauce.get(`billings/per/${date}`);
    return response;
  }
  async getBillings(){
    const response: ApiResponse<any> = await api.apisauce.get(`billings`);
    return response;
  }
}

const billingService = new BillingService();
export default billingService;
