import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { wishlist } from '../../models/Wishlist';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { wishlistItem } from '../../models/WishlistItem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist :  wishlist = new wishlist();

  constructor(private http : HttpClient,private snackBar : MatSnackBar) {}

  getWishlist(){
    return this.wishlist;
  }

  public getAllWishlists() : Observable<wishlistItem[]>{ 
    return this.http.get<wishlistItem[]>('http://localhost:9090/wishlist');
 }

 getWishlistByUser(userId : number) : wishlist{
    this.getAllWishlists().subscribe({
       next : (data) => {
          let filteredItems : wishlistItem[] = data.filter(item => {
             return item.userId == userId;
         });
          if(filteredItems != undefined){
             this.wishlist.products  = filteredItems;
          }
       },
       error : (error) => {
          console.log(error);
          return error;
       }
    });
    return this.wishlist;
 }

 public addToWishlist(product: Product, userId: number): Observable<any> {
  let p = this.getWishlistByUser(userId).products.find(value => value.product.productId === product.productId);
   if (p === undefined) {
       this.showNotification('Item added to wishlist');
       return this.addItem(product,userId);
    }
    else {
       this.showNotification("This item is already in your Wishlist!");
       return of({});
    }
 }

 public addItem(product : Product , id : number) : Observable<any>{
    const data = {
      product : product,
      userId : id
   };
    return this.http.post(`http://localhost:9090/wishlist/post`,data);
 }

 public removeItem(product : Product) : Observable<any>{
    return this.http.delete(`http://localhost:9090/wishlist/delete/${product.productId}`);
 }

 showNotification(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 5000, // Duration in milliseconds
    horizontalPosition: 'center', // Position horizontally
    verticalPosition: 'top', // Position vertically
  });
}

}
