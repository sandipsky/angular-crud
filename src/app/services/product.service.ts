import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:5000'

  constructor(private _http:HttpClient) { }

  getAllProducts(): Observable<any>
  {
    return this._http.get(this.apiUrl+'/api/product')
  }

  createProduct(product:any)
  {
    return this._http.post(this.apiUrl+'/api/product',product);
  }

  updateProduct(id:number,product:any)
  {
    return this._http.put(this.apiUrl+`/api/product/${id}`,product);
  }

  deleteProduct(id:number)
  {
    return this._http.delete(this.apiUrl+`/api/product/${id}`);
  }

  filterProduct()
  {
    return this._http.delete(this.apiUrl+`/api/Product/filter?sortBy=name&sortOrder=asc&filterByName=a&minPrice=1&maxPrice=110&page=1&pageSize=10`);
  }

  viewSecret()
  {
    return this._http.get(this.apiUrl + '/api/product/secret');
  } 
}
