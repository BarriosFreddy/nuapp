import ApiFeedbackResponse from "./apiFeedbackResponse";

export default interface ItemServiceDAO<T> {
  save(t: T): Promise<ApiFeedbackResponse>;
  update(t: T): Promise<ApiFeedbackResponse>;
  getAllItems(): Promise<ApiFeedbackResponse>;
  getItems(search: string): Promise<ApiFeedbackResponse>;
}
