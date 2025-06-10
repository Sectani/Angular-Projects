import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../models/Product';
import { ProductServicesService } from '../../services/product-services.service';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  allProducts : Product[]=[];
  newProducts : Product[]=[];
  user : any;

  constructor(private productService : ProductServicesService, 
              private cartService : ShopingCartServiceService,
              private wishListService : WishlistService,
              private route : Router,
              private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
    const currentUser = localStorage.getItem('User');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
    }

    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.allProducts = data;
      },
      error : (error) => {
        this.showNotification('Error while loading products!. Please try again');
        console.error(error);
      }
    });
    
    //this.getNewProducts();
  } 

  /*getNewProducts() {
    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.allProducts = data;
        //let lastTeenProducts = this.allProducts.slice(-1);
        //this.newProducts = this.newProducts.concat(lastTeenProducts);
      },
      error : (error) => {
        this.showNotification('Error while loading products!. Please try again');
        console.error(error);
      }
    });
  }*/

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

  addTowishlist(product : Product){
    this.wishListService.addToWishlist(product,this.user.id).subscribe({
      next :(res)=>{
        console.log(res);
      },
      error:(e)=>console.error(e)
    });
  }

  logout(){
    localStorage.removeItem('User');
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
