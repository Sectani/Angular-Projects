import { Product } from "./Product";

export class wishlistItem {

    private _product: Product;
    public get product(): Product {
        return this._product;
    }
    public set product(value: Product) {
        this._product = value;
    }
    private _userId: number;
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }

    constructor(product : Product , user : number ){
        this._product = product;
        this._userId = user;
    }

}