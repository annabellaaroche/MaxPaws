import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  editForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
      ]],
      addres: ['', [
        Validators.required,
      ]],
    });
  }

  submit(){

  }

}


