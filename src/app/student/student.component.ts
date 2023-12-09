import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  constructor(public dialog: MatDialog)
  {
    
  }
}
