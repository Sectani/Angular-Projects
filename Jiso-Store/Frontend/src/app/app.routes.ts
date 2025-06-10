import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailsComponent } from './components/details/details.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './components/guards/admin.guard';
import { NewProductComponent } from './components/new-product/new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OffersComponent } from './components/offers/offers.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
   { path : 'login' , component : LoginComponent },
   { path : '' , component : LoginComponent },
   { path: 'home' , component : HomeComponent },
   { path: 'products' , component : ProductsComponent },
   { path: 'account' , component : ProfileComponent },
   { path: 'details/:productId' , component : DetailsComponent },
   { path: 'cart' , component : ShopingCartComponent },
   { path: 'checkout' , component : CheckoutComponent },
   { path: 'wishlist' , component : WishlistComponent },
   { path: 'admin' , component : AdminComponent, canActivate : [adminGuard]},
   { path: 'admin/add' , component : NewProductComponent, canActivate : [adminGuard] },
   { path: 'admin/edit/:productId' , component : EditProductComponent, canActivate : [adminGuard] },
   { path: 'admin/offers' , component : OffersComponent, canActivate : [adminGuard] }
];
