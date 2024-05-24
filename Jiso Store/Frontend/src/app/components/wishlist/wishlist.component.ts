import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { wishlist } from '../../../models/Wishlist';
import { wishlistItem } from '../../../models/WishlistItem';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../../models/Product';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  Wishlist : wishlist = new wishlist();
  CartItem! : wishlistItem;
  user : any;

  constructor(private service : WishlistService,
              private cartService : ShopingCartServiceService,
              private route : Router,
              private snackBar : MatSnackBar){}

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      const currentUser = localStorage.getItem('User');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
      }
    }
    this.Wishlist = this.service.getWishlistByUser(this.user.id);
  }

  addToCart(product : Product) {
    if (this.user.role == 'admin' || this.user.role == 'user'){
      this.cartService.addToCart(product,this.user.id).subscribe({
        next :(res)=>{
          console.log(res);
        },
        error:(e)=>console.error(e)
      });
    }
    if(this.user.role == 'guest'){
      this.cartService.addToGuestCart(product);
    }
  }

  remove(product : Product) {
    this.service.removeItem(product).subscribe({
      next : () => {
        //window.location.reload();
        this.Wishlist = this.service.getWishlistByUser(this.user.id);
      },
      error : (error) => {
        console.error(error);
        this.showNotification('An error occurred. Please try again');
      }
    });
  }

  logout(){
    localStorage.removeItem("User");
    this.route.navigateByUrl("/login");
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Position horizontally
      verticalPosition: 'top', // Position vertically
    });
  }

}
