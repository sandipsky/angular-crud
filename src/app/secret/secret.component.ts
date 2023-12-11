import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrl: './secret.component.scss'
})
export class SecretComponent {

  secret: any;

  constructor(private _productService: ProductService)
  {

  }

  viewContent()
  {
    this._productService.viewSecret().subscribe(res => this.secret = res);
  }
}
