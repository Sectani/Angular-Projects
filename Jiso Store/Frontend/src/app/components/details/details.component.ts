import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../../models/Product';
import { ProductServicesService } from '../../services/product-services.service';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  relatedProducts  : Product[]=[];
  productId : number;
  currentProduct! : Product;
  quantity : number = 1 ;
  user : any;

  constructor (private productService : ProductServicesService, 
              private cartService : ShopingCartServiceService,
              private wishListService : WishlistService,
              private route : Router,
              private activeRoute : ActivatedRoute) {

      this.productId = this.activeRoute.snapshot.params['productId'];

    }

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      const currentUser = localStorage.getItem('User');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
      }
    }

    this.productService.getByProductById(this.productId).subscribe((data)=>{
      this.currentProduct = data;
    });

    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.productService.getByProductById(this.productId).subscribe((data)=>{
          this.currentProduct = data;
        });
        this.relatedProducts = data.filter(p=>p.productCategory == this.currentProduct.productCategory);
        console.log(this.relatedProducts);
      },
      error : (err) => {
        console.log(err);
      }
    });

  }

  addToWishlist(product : Product){
    this.wishListService.addToWishlist(product,this.user.id);
    this.route.navigateByUrl("/wishlist");
  }

  buyNow(product : Product) {
    this.cartService.clearOnItem();
    this.cartService.setOneItem(product,this.quantity);
    this.route.navigateByUrl("/checkout");
  }

  addToCart(product : Product) {
    if (this.user.role == 'admin' || this.user.role == 'user'){
      this.cartService.addToCart(product,this.user.id).subscribe({
        next :(res)=>{
          console.error(res);
        },
        error:(e)=>console.error(e)
      });
    }
    if(this.user.role == 'guest'){
      this.cartService.addToGuestCart(product);
    }
  }

  increment() {
    if (this.quantity < this.currentProduct.productQuantity) {
      this.quantity++;
      console.log(this.quantity);
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  logout(){
    localStorage.removeItem('User');
    this.route.navigateByUrl("/login");
  }

}
