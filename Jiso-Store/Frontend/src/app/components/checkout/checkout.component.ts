import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ShoppingCart } from '../../../models/ShoppingCart';
import { ShopingCartServiceService } from '../../services/shoping-cart-service.service';
import { ProductServicesService } from '../../services/product-services.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  user : any;
  Cart : ShoppingCart = new ShoppingCart();
  form! : FormGroup;
  currentDate: Date = new Date();
  routeDirection : string = "/cart";

  constructor(private cartService : ShopingCartServiceService,
              private productService : ProductServicesService,
              private route : Router,
              private fb: FormBuilder){}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('User');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }

    if(this.cartService.isOneItem == false){
      this.Cart.itemsProduct = this.cartService.getItems();
    }
    else{
      this.Cart = this.cartService.getOneItem();
      this.routeDirection = "/home";
    }

    this.form = this.fb.group({
      firstName : this.fb.control(null,[Validators.required]),
      lastName : this.fb.control(null,[Validators.required]),
      phone : this.fb.control('212 ',[Validators.required]),
      email : this.fb.control(null,[Validators.required]),
      address : this.fb.control(null,[Validators.required]),
      city : this.fb.control(null,[Validators.required]),
      postalCode : this.fb.control(null,[Validators.required]),
      message : this.fb.control(null)
    });
  }


  getTotalPrice(){
    return this.Cart.itemsProduct.reduce((acc, curr) => acc + (curr.itemProduct.productPrice * curr.quantity), 0);
  }

  getFinalPrice(){
    let DISCOUNT = 0.1;
    let Shipping_cost = 200;
    return (this.getTotalPrice() +  Shipping_cost - ((DISCOUNT*this.getTotalPrice())/100));
  }

  generateInvoice(): void {

    const pdf = new jsPDF();
    let yPos : number = 20;
    
    pdf.setFontSize(18);
    pdf.text('Invoice',92,yPos);

    pdf.setFontSize(10);
    pdf.text(`${this.currentDate.getDate()}/${this.currentDate.getMonth()+1}/${this.currentDate.getFullYear()}  at  ${this.currentDate.getHours()}:${this.currentDate.getMinutes()}:${this.currentDate.getSeconds()}`,160,yPos+=10);

    pdf.setFontSize(13);
    pdf.text('Customer informations :',20,yPos+=10);

    pdf.setFontSize(11);
    pdf.text(`Full name :  ${this.form.value.firstName} ${this.form.value.lastName}`,20,yPos+=8);
    pdf.text(`Phone : ${this.form.value.phone}`,20,yPos+=6);
    pdf.text(`Address : ${this.form.value.address}`,20,yPos+=6);
    pdf.text(`City : ${this.form.value.city}`,20,yPos+=6);
    pdf.text(`Postal code : ${this.form.value.postalCode}`,20,yPos+=6);

    yPos += 10;
    const columns = ["", "Quantity", "Price"];
    const rows = this.Cart.itemsProduct.map(item => [item.itemProduct.productTitle, item.quantity, `${(item.itemProduct.productPrice * item.quantity)} MAD`]);
    rows.push(["Total", "" , `${this.getTotalPrice()} MAD`]);
    rows.push(["TAX", "" , "+200 MAD"]);
    rows.push(["Discount", "" , "-10%"]);
    rows.push(["Amount to pay", "" , `${this.getFinalPrice()} MAD`]);

    (pdf as any).autoTable({
      startY: yPos,
      head: [columns],
      body: rows,
      headStyles: { halign: 'center' }, // Center-align header
      //bodyStyles: { halign: 'center' }
    });
    pdf.save('invoice.pdf');
  }

  Purchase(){
    this.Cart.itemsProduct.forEach(item => {
      let product = item.itemProduct;
      product.productQuantity -= item.quantity;
      console.log(product);
      this.productService.updateProduct(product).subscribe({
        next  : () => {
            console.log(product);
            this.generateInvoice();
        },
        error : (err) => {
          console.log(err);
        }
      });
    });
  }

  Cancel(){
    confirm('Cancel this order?')
    this.form.reset;
    this.route.navigateByUrl(this.routeDirection);
  }

  logout(){
    localStorage.removeItem('User');
    this.route.navigateByUrl("/login");
  }

}
