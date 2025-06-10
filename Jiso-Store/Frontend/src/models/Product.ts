export class Product {
    
    private _productId!: number;
    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }

    private _productTitle: string;
    public get productTitle(): string {
        return this._productTitle;
    }
    public set productTitle(value: string) {
        this._productTitle = value;
    }

    private _productPrice: number;
    public get productPrice(): number {
        return this._productPrice;
    }
    public set productPrice(value: number) {
        this._productPrice = value;
    }

    private _productCategory: string;
    public get productCategory(): string {
        return this._productCategory;
    }
    public set productCategory(value: string) {
        this._productCategory = value;
    }

    private _productImage: string;
    public get productImage(): string {
        return this._productImage;
    }
    public set productImage(value: string) {
        this._productImage = value;
    }

    private _productQuantity: number;
    public get productQuantity(): number {
        return this._productQuantity;
    }
    public set productQuantity(value: number) {
        this._productQuantity = value;
    }

    private _details: string;
    public get details(): string {
        return this._details;
    }
    public set details(value: string) {
        this._details = value;
    }

    constructor(title : string , price : number , url : string , category : string , quantity : number , details : string){
        this._productTitle = title;
        this._productPrice = price;
        this._productImage = url;
        this._productCategory = category;
        this._productQuantity = quantity;
        this._details = details;
    }

}

export interface PageProduct{
    page : number ;
    size : number ;
    totalePages : number ;
    products: Product[];
}