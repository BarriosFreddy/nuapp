import ApiFeedbackResponse from "./apiFeedbackResponse";

export default interface BillingServiceDAO<T> {
  save(t: T): Promise<ApiFeedbackResponse>;
  getBillings(): Promise<ApiFeedbackResponse>;
}
