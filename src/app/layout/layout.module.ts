import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from '../product/product.component';
import { StudentComponent } from '../student/student.component';
import { SecretComponent } from '../secret/secret.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'student',
        component: StudentComponent,
      },
      {
        path: 'product',
        component: ProductComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ProductComponent, StudentComponent, SecretComponent, LayoutComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
