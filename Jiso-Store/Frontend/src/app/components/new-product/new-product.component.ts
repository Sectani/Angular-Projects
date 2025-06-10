import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductServicesService } from '../../services/product-services.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{

  productFormGroup! : FormGroup;
  selectedOption : string = "url";

  constructor(private productService : ProductServicesService,
              private fb : FormBuilder,
              private route : Router,
              private snackBar : MatSnackBar){}

  
  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      productTitle : this.fb.control(null,[Validators.required]),
      productPrice : this.fb.control(null,[Validators.required,Validators.min(0)]),
      productImage    : this.fb.control(null,[Validators.required]),
      productCategory : this.fb.control(null,[Validators.required]),
      productQuantity : this.fb.control(null,[Validators.required,Validators.min(1)]),
      details : this.fb.control(null),
    });    
  }

  ADD(){
    let product = this.productFormGroup.value;
    this.productService.addProduct(product).subscribe({
      next  : () => {
        //this.route.navigateByUrl("/admin");
        this.productFormGroup.reset;
        this.showNotification('Product added successfully');
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
