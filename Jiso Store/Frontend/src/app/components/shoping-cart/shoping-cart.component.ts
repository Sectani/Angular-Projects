import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCart } from '../../../models/ShoppingCart';
import { ShoppingCartItem } from '../../../models/ShoppingCartItem';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';

@Component({
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './shoping-cart.component.html',
  styleUrl: './shoping-cart.component.css'
})
export class ShopingCartComponent implements OnInit{
  
  Cart : ShoppingCart = new ShoppingCart();
  CartItem! : ShoppingCartItem;
  quantityFormGroup! : FormGroup;

  user : any;
  quantity : number = 1 ;
  isGuest : boolean = true;

  constructor(private cartService : ShopingCartServiceService,
              private fb : FormBuilder,
              private route : Router,
              private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      const currentUser = localStorage.getItem('User');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
      }
    }
    
    if (this.user.role == 'admin' || this.user.role == 'user'){
      this.Cart = this.cartService.getCartByUser(this.user.id);
    }
    if(this.user.role == 'guest'){
      this.Cart = this.cartService.getGuestCart();
    }

    this.quantityFormGroup= this.fb.group({
      selectedQuantity : this.fb.control(null),
    });
  }

  remove(SCI : ShoppingCartItem) {
    if (this.user.role == 'admin' || this.user.role == 'user'){
      this.cartService.removeItem(SCI.itemProduct).subscribe({
        next : () => {
          this.Cart = this.cartService.getCartByUser(this.user.id);
        },
        error : (error) => {
          console.error(error);
          this.showNotification('An error occurred. Please try again');
        }
      });
    }
    if(this.user.role == 'guest'){
      //confirm('Are you sure to delete this item?');
      this.cartService.removeFromGuestCart(SCI.itemProduct);
    }
  }

  getTotalPrice(){
    return this.Cart.itemsProduct.reduce((acc, curr) => acc + (curr.itemProduct.productPrice * curr.quantity), 0);
  }

  getFinalPrice(){
    let DISCOUNT = 0.1;
    let  Shipping_cost = 200;
    return (this.getTotalPrice() +  Shipping_cost - ((DISCOUNT*this.getTotalPrice())/100));
  }

  increment(currentSCI : ShoppingCartItem) {
    let item = this.Cart.itemsProduct.find(x=>x.itemProduct.productId == currentSCI.itemProduct.productId);
    if(item != undefined){
      if (item.quantity < item.itemProduct.productQuantity) {
        this.quantity++;
        item.quantity++;
        this.quantity = item.quantity
      }
      if (this.user.role != 'guest'){
          this.cartService.updateItem(item.itemProduct,item.quantity).subscribe({
          next : ()=>{
            return true;
          },
          error: ()=>{
            this.showNotification('An error occurred. Please try again');
          }
        });
      }
    }
  }

  decrement(currentSCI : ShoppingCartItem) {
    let item = this.Cart.itemsProduct.find(x=>x.itemProduct.productId == currentSCI.itemProduct.productId);
    if(item != undefined){
      if (item.quantity > 1) {
        item.quantity--;
        this.quantity--;
      }
      if (this.user.role != 'guest'){
          this.cartService.updateItem(item.itemProduct,item.quantity).subscribe({
          next : ()=>{
            return true;
          },
          error: ()=>{
            this.showNotification('An error occurred. Please try again');
          }
        });
      }
    }
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
