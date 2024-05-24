import { Injectable } from '@angular/core';
import { PageProduct, Product } from '../../models/Product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  private products : Product[] = [];
  
  constructor(private http : HttpClient) {
    this.getAllProducts().subscribe({
      next : (data) => {
        this.products = data;
      }
    });

  }


  public getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:9090/products');
  }
 
  public getByProductById(id : number) : Observable<Product>{
    return this.http.get<Product>(`http://localhost:9090/products/${id}`);
  }

  public getPageProducts(page : number , size : number) : Observable<PageProduct>{ 
    let index = page * size ;
    let totalePages = ~~(this.products.length / size);
    if(this.products.length % size != 0){
      totalePages++;
    }
    let pageProducts = this.products.slice(index,index+size);
    return of({page : page , size : size , totalePages : totalePages , products : pageProducts});
  }

  public searchProducts(keyword : string , page : number , size : number) : Observable<PageProduct>{
    let res = this.products.filter(p=>p.productTitle.includes(keyword));
    let index = page * size ;
    let totalePages = ~~(res.length / size);
    if(this.products.length % size != 0){
      totalePages++;
    }
    let pageProducts = res.slice(index,index+size);
    return of({page : page , size : size , totalePages : totalePages , products : pageProducts});
  }

  public getByCategory(category : string , page : number , size : number) : Observable<PageProduct>{
    let res = this.products.filter(p=>p.productCategory == category);
    let index = page * size ;
    let totalePages = ~~(res.length / size);
    if(this.products.length % size != 0){
      totalePages++;
    }
    let pageProducts = res.slice(index,index+size);
    return of({page : page , size : size , totalePages : totalePages , products : pageProducts});
  }

  public getByPrice(min : number , max : number , page : number , size : number) : Observable<PageProduct>{
    let res = this.products.filter(p => p.productPrice >= min && p.productPrice <= max);
    let index = page * size ;
    let totalePages = ~~(res.length / size);
    if(this.products.length % size != 0){
      totalePages++;
    }
    let pageProducts = res.slice(index,index+size);
    return of({page : page , size : size , totalePages : totalePages , products : pageProducts});
  }

  public addProduct(product : Product) : Observable<Product>{
    const data = {
      productTitle : product.productTitle,
      productPrice : product.productPrice,
      productCategory : product.productCategory,
      productImage : product.productImage,
      productQunatity : product.productQuantity,
      details : product.details
  };
  return this.http.post<Product>('http://localhost:9090/products/post',data);
  }

  public updateProduct(product : Product) : Observable<Product>{
    const data = {
      productTitle : product.productTitle,
      productPrice : product.productPrice,
      productCategory : product.productCategory,
      productImage : product.productImage,
      productQunatity : product.productQuantity,
      details : product.details
  };
    return this.http.put<Product>(`http://localhost:9090/products/put/${product.productId}`, data);
  }

  public deleteProduct(product : Product) : Observable<any>{
    //let index = this.products.indexOf(product);
    //this.products.splice(index,1);
    return this.http.delete(`http://localhost:9090/products/delete/${product.productId}`);
  }

}
