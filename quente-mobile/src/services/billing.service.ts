import { ApiResponse } from "apisauce";
import { api } from "./api";
import { Billing } from "../models/Billing";
import BillingServiceDAO from "./billingServiceDAO";
import ApiFeedbackResponse from "./apiFeedbackResponse";
import { generateId } from "../utils";
import sqliteService from "./sqlite.service";

class BillingService implements BillingServiceDAO<Billing> {
  private TABLE_NAME = "billings";
  constructor() {}

  async save(billing: Billing): Promise<ApiFeedbackResponse> {
    try {
      /*  const response: ApiResponse<any> = await api.apisauce.post(`billings`, billing); */
      const billingData = {
        _id: generateId(),
        creationDate: billing.creationDate,
        billAmount: billing.billAmount,
        data: JSON.stringify(billing),
      };
      const data = await sqliteService.insert(this.TABLE_NAME, billingData);
      const response = {
        ok: !!data,
        data: JSON.parse(data.data),
      };
      return response;
    } catch (e) {
      console.error(e);
      return { ok: false, data: undefined };
    }
  }
  async getBillings() {
    /*     const response: ApiResponse<any> = await api.apisauce.get(`billings`); */
    try {
      const resultSet = await sqliteService.query(this.TABLE_NAME);
      return { ok: !!resultSet, data: resultSet };
    } catch (e) {
      console.error(e);
      return { ok: false, data: undefined };
    }
  }
  async getBillingsByDate(date: string) {
    const response: ApiResponse<any> = await api.apisauce.get(
      `billings/per/${date}`
      );
      return response
  }
}

const billingService = new BillingService();
export default billingService;
