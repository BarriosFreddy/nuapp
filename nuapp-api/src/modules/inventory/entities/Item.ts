import { Types } from 'mongoose';

export class Item {
  constructor(
    public id: Types.ObjectId,
    public code: string,
    public name: string,
    public description: string,
    public price: number,
    public cost: number,
    public stock: number,
    public reorderPoint: number, // lowest point to alert and reorder it
    public measurementUnit: string,
    public lot: string,
    public expirationDate: string,
    public laboratory: string,
    public categoryId: Types.ObjectId,
    public supplierId: Types.ObjectId,
    public modifiedBy: Types.ObjectId,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public addStock(stock: number): void {
    this.stock = this.stock ?? 0;
    this.stock += +stock;
  }

  public removeStock(units: number): void {
    this.stock = this.stock ?? 0;
    const subtraction = this.stock - +units;
    this.stock = subtraction <= 0 ? 0 : subtraction;
  }

  public static of({
    id,
    code,
    name,
    description,
    price,
    cost,
    stock,
    reorderPoint,
    measurementUnit,
    lot,
    expirationDate,
    laboratory,
    categoryId,
    supplierId,
    modifiedBy,
    createdAt,
    updatedAt,
  }: any): Item {
    return new Item(
      id,
      code,
      name,
      description,
      price,
      cost,
      stock,
      reorderPoint,
      measurementUnit,
      lot,
      expirationDate,
      laboratory,
      categoryId,
      supplierId,
      modifiedBy,
      createdAt,
      updatedAt,
    );
  }
}
