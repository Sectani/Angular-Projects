import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductServicesService } from './services/product-services.service';
import { ShopingCartServiceService } from './services/shoping-cart-service.service';
import { WishlistService } from './services/wishlist.service';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    ProductServicesService,
    AuthServiceService,
    ShopingCartServiceService,
    WishlistService, 
    HttpClient
  ]
})

export class AppComponent {
  title = 'TP3_Panier_dachat';
}
