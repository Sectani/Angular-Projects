import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../models/Product';
import { ProductServicesService } from '../../services/product-services.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  currentProduct! : Product;
  productFormGroup! : FormGroup;
  user : any;
  productId : number;
  selectedOption : string = "url";

  constructor(private productService : ProductServicesService,
              private fb : FormBuilder,
              private route : Router,
              private activeRoute : ActivatedRoute,
              private snackBar : MatSnackBar){

    this.productId = this.activeRoute.snapshot.params['productId'];

  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('User');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }

    this.productService.getByProductById(this.productId).subscribe((data)=>{
        console.log("Data received");
        this.currentProduct= data;
        console.log(this.currentProduct);
        
        this.productFormGroup = this.fb.group({
          productTitle    : this.fb.control(this.currentProduct.productTitle,[Validators.required]),
          productPrice    : this.fb.control(this.currentProduct.productPrice,[Validators.required,Validators.min(0)]),
          productImage    : this.fb.control(this.currentProduct.productImage,[Validators.required]),
          productCategory : this.fb.control(this.currentProduct.productCategory,[Validators.required]),
          productQuantity : this.fb.control(this.currentProduct.productQuantity,[Validators.required,Validators.min(1)]),
          details         : this.fb.control(this.currentProduct.details)
        });    
     });

  }

  EDIT(){
    let product = this.productFormGroup.value;
    product.productId = this.productId;
    console.log(product);
    this.productService.updateProduct(product).subscribe({
      next : () => {
        //this.route.navigateByUrl("/admin");
        this.showNotification('Product updated successfully');
      },
      error : () => {
        this.showNotification('An error occurred. Please try again');
      }
    });  
  }

  cancel(){
    this.productFormGroup.reset;
    this.route.navigateByUrl("/admin");
  }

  onSelectOption(value : string){
    this.selectedOption = value;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Position horizontally
      verticalPosition: 'top', // Position vertically
    });
  }


}
