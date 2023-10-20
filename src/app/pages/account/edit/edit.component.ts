import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  editForm: FormGroup;
  userData: any;
  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.editForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
      ]],
      user_name: ['', [
        Validators.required,
      ]],
      first_name: ['', [
        Validators.required,
      ]],
      last_name: ['', [
        Validators.required,
      ]],
    });
    apiService.getLoggedUser().subscribe(
      (res)=>{
        this.userData = res;
        this.editForm.patchValue({
          email: this.userData.email,
          user_name: this.userData.user_name,
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
        }); 
      }
    );
  }

  submit(){

  }

}


