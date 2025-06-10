export class Offer {
    offerId! : string
    offerTitle! : string;
    offerDescription! : string;
    offerDiscount! : number;
    offerImage! : string;
    isActive! : boolean;

    constructor(id : string, title : string, description : string, discount : number, status : boolean, img : string){
        this.offerId = id;
        this.offerTitle = title;
        this.offerDescription = description;
        this.offerDiscount = discount;
        this.isActive = status;
        this.offerImage = img;
    }
}