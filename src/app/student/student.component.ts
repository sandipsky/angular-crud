import { Component, TemplateRef, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  mode: string = 'add';
  studentIndex: any = null;

  studentList:any = [];

  studentForm: FormGroup;
  
  @ViewChild('popup', { static: true }) popup!: TemplateRef<any>;
  

  constructor(public dialog: MatDialog, private _fb: FormBuilder)
  {
    this.studentForm = this._fb.group({
      name: [],
      roll: []
    })
  }

  ngOnInit()
  {
    this.getAllStudents();
  }

  openDialog()
  {
    this.dialog.open(this.popup);
  }

  closeDialog()
  {
    this.dialog.closeAll();
    this.mode = 'add';

  }

  getAllStudents()
  {
    this.studentList = JSON.parse(localStorage.getItem('student') || '') || [];
  }

  submitStudent(index?:number)
  {
    if(index==undefined)
    {
      this.studentList.push(this.studentForm.value);
    }
    else
    {
      this.studentList[index] = this.studentForm.value;
    }
    localStorage.setItem('student', JSON.stringify(this.studentList) );
    this.getAllStudents();
    this.studentForm.reset();
    this.closeDialog();
    this.mode = 'add';
  }

  editStudent(student:any,index:number)
  {
    this.mode = 'edit';
    this.studentIndex = index;
    this.studentForm.patchValue(student);
    this.openDialog();
  }

  deleteStudent(i:number)
  {
    this.studentList = this.studentList.filter((item:any,index:any) => index != i);
    localStorage.setItem('student', JSON.stringify(this.studentList) );
    this.getAllStudents();
  }
}
