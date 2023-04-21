import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  studentForm:FormGroup;
  students:any[]=[];
  selected: any = null;
  deleteList: any[]=[];


  // URL = "https://crudcrud.com/api/ff1d6046e70643f793ee17aae67eb13a/student";


  //we need to create formbuilderobject
  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: '',
      email: '',
      gender: 'Male',
      isActive: false,
    });

    //fetching data from localstorage
    const data = localStorage.getItem('student');
    if (data) {
      this.students = JSON.parse(data)
    }
  }

  addStudent(): void {
    // const student = {
    //   name: this.studentForm.get('name').value,
    //   email: this.studentForm.get('email').value,
    //   gender: this.studentForm.get('gender').value,
    //   isActive: this.studentForm.get('isActive').value,

    // };
    // this.students.push(student);
    this.students.push(this.studentForm.value);
    localStorage.setItem('student', JSON.stringify(this.students));
    this.studentForm.reset();
  }  

  editStudent(student: any, index:any): void {
    //populate field
    //this.selected = student;
    this.selected = index;
    //this.studentForm.patchValue(student);
    this.studentForm.setValue(student);

  }

  // updateStudent(): void {
  //    //edit item
  //    const index = this.students.findIndex(student => student.name === this.selected.name);
  //    this.students[index] = {
  //      // id: this.selected.id,
  //      name: this.studentForm.get('name').value,
  //      email: this.studentForm.get('email').value,
  //      gender: this.studentForm.get('gender').value,
  //      isActive: this.studentForm.get('isActive').value
  //    };
  //    localStorage.setItem('student', JSON.stringify(this.students));
  //    this.selected = null;
  //    this.studentForm.reset();
  // }

  updateStudent(): void{
    this.students[this.selected] = this.studentForm.value;
    localStorage.setItem('student', JSON.stringify(this.students));
    this.selected = null;
    this.studentForm.reset();
  }

  // deleteStudent(student:any): void{
  //   this.selected = student;
  //   const index = this.students.findIndex(student => student.name === this.selected.name);
  //   this.students.splice(index,1);
  //   localStorage.setItem('student', JSON.stringify(this.students));
  //   this.selected = null;
  // }
  deleteStudent(index:any){
    this.students.splice(index,1);
    localStorage.setItem('student', JSON.stringify(this.students));
  }

  selectAll(e){
    this.students.forEach((c) => { 
      c.selected = e.target.checked
      if (e.target.checked)
      {
        this.deleteList.push(c);
      }
      else
      {
        this.deleteList = [];
      }
    });
  }


  onItemChange(student: any)
  {
    if(student.selected)
    {
      this.deleteList.push(student);
    }
    else
    {
      const index = this.deleteList.indexOf(student);
      this.deleteList.splice(index,1);
    }
  }


  deleteSelected(): void {
    this.deleteList.forEach(item => {
      const index = this.students.indexOf(item);
      this.students.splice(index,1);
    });
    localStorage.setItem('student', JSON.stringify(this.students));
    this.deleteList=[]
  }
  }
  


