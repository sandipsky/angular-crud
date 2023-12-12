import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  mode: string = 'add';
  productId: any = null;
  length: number = 0;

  productList: any = [];

  productForm: FormGroup;
  filterForm: FormGroup;

  @ViewChild('popup', { static: true }) popup!: TemplateRef<any>;


  constructor(public dialog: MatDialog, private _fb: FormBuilder, private productService: ProductService, private toastr: ToastrService) {
    this.filterForm = this._fb.group({
      sortBy: ['name'],
      sortOrder: ['asc'],
      filterByName: [''],
      minPrice: [0],
      maxPrice: [100000],
      page: [1],
      pageSize: [6]
    })
    
    this.productForm = this._fb.group({
      name: [],
      price: []
    })
  }

  ngOnInit() {
    // this.getAllProducts();
    this.filterProduct();
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
    this.productService.filterProduct(this.filterForm.value).subscribe({
      next: (data: any) => {
        this.productList = data.items;
        this.length = data.totalItems;
      },
      error: (err: any) => {
        this.toastr.error(err.message, 'Error', {
          closeButton: true,
        });
      },
    });
  }

  sortData(sort: Sort) {
    if (sort.active) {

      this.filterForm?.get('sortBy')?.setValue(sort.active);
    }
    else {
      this.filterForm?.get('sortBy')?.setValue('name');

    }
    this.filterForm?.get('sortOrder')?.setValue(sort.direction || "asc");
    this.filterProduct();
  }

  onChangedPage(pageData: PageEvent) {
    this.filterForm?.get('page')?.setValue(pageData.pageIndex+1);
    this.filterForm?.get('pageSize')?.setValue(pageData.pageSize);
    this.filterProduct();
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
