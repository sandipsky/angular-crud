import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  mode: string = 'add';
  productId: any = null;

  productList: any = [];

  productForm: FormGroup;
  filterForm: FormGroup;

  @ViewChild('popup', { static: true }) popup!: TemplateRef<any>;


  constructor(public dialog: MatDialog, private _fb: FormBuilder, private productService: ProductService, private toastr: ToastrService) {
    this.filterForm = this._fb.group({
      sortBy: [],
      sortOrder: [],
      filterByName: [],
      minPrice: [],
      maxPrice: [],
      page: [],
      pageSize: []
    })
    
    this.productForm = this._fb.group({
      name: [],
      price: []
    })
  }

  ngOnInit() {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(this.popup);
  }

  closeDialog() {
    this.dialog.closeAll();
    this.mode = 'add';

  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productList = data;
      },

      error: (err: any) => {
        this.toastr.error(err.message, 'Error', {
          closeButton: true,
        });
      },
    })
  }

  filterProduct()
  {
    this.productService.filterProduct(this.filterForm.value);
  }

  submitProduct(id?: number) {
    if (id == undefined) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Product Added Succesfully', 'Success', {
            closeButton: true,
          });
          this.getAllProducts();

        },
        error: (err: any) => {
          this.toastr.error(err.message, 'Error', {
            closeButton: true,
          });
        },
      })
    }
    else {
      this.productService.updateProduct(id,this.productForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Product Updated Succesfully', 'Success', {
            closeButton: true,
          });
          this.getAllProducts();

        },
        error: (err: any) => {
          this.toastr.error(err.message, 'Error', {
            closeButton: true,
          });
        },
      })
    }
    this.productForm.reset();
    this.closeDialog();
    this.mode = 'add';
  }

  editProduct(product: any) {
    this.mode = 'edit';
    this.productForm.patchValue(product);
    this.productId = product.id;
    this.openDialog();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (data: any) => {
        this.toastr.success('Product Deleted Succesfully', 'Success', {
          closeButton: true,
        });
        this.getAllProducts();

      },
      error: (err: any) => {
        this.toastr.error(err.message, 'Error', {
          closeButton: true,
        });
      },
    })
  }
}
