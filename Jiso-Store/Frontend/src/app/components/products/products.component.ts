import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/Product';
import { ProductServicesService } from '../../services/product-services.service';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products : Product[]=[];
  currentPage : number = 0;
  pageSize : number = 5;
  totalPages : number = 0;
  searchFormGroup! : FormGroup;
  isSearch :boolean = false ;
  isSearchByCategory : boolean= false;
  isSearchByPrice : boolean = false;
  errorMessage! : string;
  
  user : any;

  constructor (private productService : ProductServicesService, 
               private fb : FormBuilder,
               private cartService : ShopingCartServiceService,
               private wishListService : WishlistService,
               private route : Router) {}

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      const currentUser = localStorage.getItem('User');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
      }
    }

    this.searchFormGroup = this.fb.group({
      Keyword : this.fb.control(null),
      min : this.fb.control(0),
      max : this.fb.control(500000)
    });
    this.GetPageProducts();
  }

  GetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.products = data;
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  GetPageProducts() {
    this.productService.getPageProducts(this.currentPage , this.pageSize).subscribe({
      next : (data) => {
        this.products = data.products;
        this.totalPages = data.totalePages;
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  GetSearchProducts() {
    this.isSearch = true;
    let keyword = this.searchFormGroup.value.Keyword;
    this.productService.searchProducts(keyword , this.currentPage , this.pageSize).subscribe({
      next : (data) => {
        this.products = data.products ;
        this.totalPages = data.totalePages ;
      }
    })
  }

  category! : string;
  GetByCategory(category : string) {
    this.isSearchByCategory = true;
    this.category = category;
    this.productService.getByCategory(category , 0 , this.pageSize).subscribe({
      next : (data) => {
        this.products = data.products ;
        this.totalPages = data.totalePages ;
      }
    })
  }

  onMinRangeChange(event: Event): void {
    const rangeValue = (event.target as HTMLInputElement).value;
    const numericValue = Number(rangeValue);

    // Update form controls based on the range value
    this.searchFormGroup.controls['min'].setValue(numericValue);
  }
  onMaxRangeChange(event: Event): void {
    const rangeValue = (event.target as HTMLInputElement).value;
    const numericValue = Number(rangeValue);

    // Update form controls based on the range value
    this.searchFormGroup.controls['max'].setValue(numericValue); // Adjust according to your requirement
  }

  GetByPrice() {
    this.isSearch = true;
    this.isSearchByPrice = true;
    let min = this.searchFormGroup.value.min;
    let max = this.searchFormGroup.value.max;
    this.productService.getByPrice(min , max , this.currentPage , this.pageSize).subscribe({
      next : (data) => {
        this.products = data.products ;
        this.totalPages = data.totalePages ;
      }
    })
  }

  goToPage(i : number) {
    this.currentPage = i;
    if(this.isSearch == true){
      this.GetSearchProducts();
    }
    else if(this.isSearchByCategory == true){
      this.GetByCategory(this.category);
    }
    else if(this.isSearchByPrice == true){
      this.GetByPrice();
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

  addTowishlist(product : Product){
    this.wishListService.addToWishlist(product,this.user.id).subscribe({
      next :(res)=>{
        console.log(res);
      },
      error:(e)=>console.error(e)
    });
  }

  view : string = 'list';

  handleView(param : string){
    this.view = param;
  }

  arr : Product[]=[];
  getCategories(){
    this.productService.getAllProducts().subscribe({
      next : (data) => {
        this.arr = data;
      }
    });
    const categories : string[] = this.arr.map(product => product.productCategory);
    
    return Array.from(new Set(categories));
    //return categories;
  }

  logout(){
    localStorage.removeItem('User');
    this.route.navigateByUrl("/login");
  }

}
