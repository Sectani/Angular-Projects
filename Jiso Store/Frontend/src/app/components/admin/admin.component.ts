import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/Product';
import { ProductServicesService } from '../../services/product-services.service';
import { Offer } from '../../../models/Offer';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
    products : Product[] = [];
    offers   : Offer[] = [];
    currentPage : number = 0;
    pageSize : number = 5;
    totalPages : number = 0;
    isSearchByCategory : boolean= false;
    isOffers : boolean = false;
  
    user : any;

    offer1 : Offer = new Offer(UUID.UUID(),'Black Friday', 'Discount of 50% on all our shop products. This offer is available for 24 hours on every Fridays', 50, true, 'https://img.freepik.com/psd-gratuit/fond-banniere-black-friday-effet-texte-modifiable_47987-11753.jpg');
    offer2 : Offer = new Offer(UUID.UUID(),'Two-One offer', 'Purchase two items and get one free. ', 0, false, 'https://www.shutterstock.com/image-vector/buy-2-get-1-free-260nw-1704443341.jpg');
    
    constructor (private productService : ProductServicesService, 
                 private route : Router,
                 private snackBar : MatSnackBar) {}
  
    ngOnInit(): void {
      if(typeof localStorage !== 'undefined'){
        const currentUser = localStorage.getItem('User');
        if (currentUser) {
          this.user = JSON.parse(currentUser);
        }
      }
      this.GetPageProducts();

      this.offers.push(this.offer1);
      this.offers.push(this.offer2);
    }
  
    deleteProduct(product : Product){
      this.productService.deleteProduct(product).subscribe({
        next : () => {
          confirm('Are you sure to delete this product?');
          this.showNotification('Product deleted successfully');
          window.location.reload();
        },
        error : (error) => {
          console.error(error);
          this.showNotification('An error occurred. Please try again');
        }
      })
    }

    deleteOffer(offer : Offer){
      let index = this.offers.findIndex(o=>o.offerId === offer.offerId);
      this.offers.splice(index,1);
    }

    setOfferStatus(offer: Offer, status : boolean){
      let index = this.offers.findIndex(o => o.offerId === offer.offerId);
      this.offers[index].isActive = !status;
    }
  
    GetPageProducts(){
      this.productService.getPageProducts(this.currentPage , this.pageSize).subscribe({
        next : (data) => {
          this.products = data.products;
          this.totalPages = data.totalePages;
        },
        error : (error) => {
          console.error(error);
          this.showNotification('Error while loading products!. Please try again');
        }
      });
    }
  
    category! : string;
    GetByCategory(category : string) {
      this.isSearchByCategory = true;
      this.category = category;
      this.productService.getByCategory(category , this.currentPage , this.pageSize).subscribe({
        next : (data) => {
          this.products = data.products ;
          this.totalPages = data.totalePages ;
        }
      })
    }
  
    goToPage(i : number) {
      this.currentPage = i;
      if(this.isSearchByCategory == true){
        this.GetByCategory(this.category);
      }
      else
        this.GetPageProducts();
    }
  
    generateRange(start : number,end: number): number[] {
      // Ensure start and end are within the bounds of totalPages
      start = Math.max(0, Math.min(start, this.totalPages - 1));
      end = Math.min(this.totalPages - 1, start + 5); // Limit the end to totalPages - 1 to prevent generating excess pages
    
      return Array.from({length: end - start + 1}, (_, i) => start + i);
    }

    goToOffers(param : boolean){
      this.isOffers = param;
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
