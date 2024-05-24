import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { ShoppingCartItem } from '../../models/ShoppingCartItem';
import { ShoppingCart } from '../../models/ShoppingCart';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartServiceService {

  private cart :  ShoppingCart = new ShoppingCart();
  private guestCart :  ShoppingCart = new ShoppingCart();
  private oneIteme : ShoppingCart = new ShoppingCart();
  isOneItem : boolean = false;

  constructor(private http : HttpClient,private snackBar : MatSnackBar) {}

   public getAllCarts() : Observable<ShoppingCartItem[]>{ 
      return this.http.get<ShoppingCartItem[]>('http://localhost:9090/cart');
   }

   getCartByUser(userId : number) : ShoppingCart{
      this.getAllCarts().subscribe({
         next : (data) => {
            let filteredItems : ShoppingCartItem[] = data.filter(item => {
               return item.userId == userId;
           });
            if(filteredItems != undefined){
               this.cart.itemsProduct  = filteredItems;
            }
         },
         error : (error) => {
            console.log(error);
            return error;
         }
      });
      return this.cart;
   }

   getItems(){
      return this.cart.itemsProduct;
   }

   setOneItem(product : Product , quantity : number){
      this.oneIteme.itemsProduct.push(new ShoppingCartItem(product,quantity));
      this.isOneItem = true;
   }

   clearOnItem(){
      this.oneIteme = new ShoppingCart();
   }

   getOneItem(){
      return this.oneIteme;
   }

   public addToCart(product: Product, userId: number): Observable<any> {
    let p = this.getCartByUser(userId).itemsProduct.find(value => value.itemProduct.productId === product.productId);
     if (p === undefined) {
         this.showNotification('Item added to Cart');
         return this.addItem(product,userId);
      }
      else {
         this.showNotification("This item is already in your Cart!");
         return of({});
      }
   }

   public addItem(product : Product , id : number) : Observable<any>{
      const data = {
         itemProduct : product,
         userId : id,
         quantity : 1
     };
      return this.http.post(`http://localhost:9090/cart/post`,data);
   }

   public removeItem(product : Product) : Observable<any>{
      return this.http.delete(`http://localhost:9090/cart/delete/${product.productId}`);
   }

   public updateItem(product : Product , quantity : number) : Observable<any>{
      const data = {
         quantity : quantity,
         itemProduct : product
     };
      return this.http.put(`http://localhost:9090/cart/put/${product.productId}`,data);
   }

   public addToGuestCart(product: Product){
      let p = this.guestCart.itemsProduct.find(value => value.itemProduct.productId === product.productId);
      if (p === undefined) {
         let SCI = new ShoppingCartItem(product,1);
         this.guestCart.itemsProduct.push(SCI);
         this.showNotification('Item added to cart');
     } else {
       this.showNotification("This item is already in your Cart!");
     }
  }

  public getGuestCart(){
      return this.guestCart;
  }

  public removeFromGuestCart(product : Product ){
      let index = this.guestCart.itemsProduct.findIndex(value => value.itemProduct.productId === product.productId);

      if (index !== -1) {
         this.guestCart.itemsProduct.splice(index, 1);
      }
  }

  showNotification(message: string): void {
   this.snackBar.open(message, 'Close', {
     duration: 5000, // Duration in milliseconds
     horizontalPosition: 'center', // Position horizontally
     verticalPosition: 'top', // Position vertically
   });
 }


}
