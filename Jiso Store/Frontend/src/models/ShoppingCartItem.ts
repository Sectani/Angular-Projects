import { Product } from "./Product";

export class ShoppingCartItem {
    
    private _itemProduct: Product;
    public get itemProduct(): Product {
        return this._itemProduct;
    }
    public set itemProduct(value: Product) {
        this._itemProduct = value;
    }

    private _quantity: number;
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    private _userId!: number;
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }

    constructor(product : Product , Quantity : number = 1){
        this._itemProduct = product;
        this._quantity = Quantity;
    }

}