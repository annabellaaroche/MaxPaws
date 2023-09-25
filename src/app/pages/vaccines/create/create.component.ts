import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createVaccineForm: FormGroup;
  pets:any[]=[];
  constructor(
    public formBuilder: FormBuilder, private loginService: LoginService, private apiService: ApiService
  ) {
    this.createVaccineForm = this.formBuilder.group({
      name_vacuna: ['', [
        Validators.required,
      ]],
      date_vacuna: [null, [
        Validators.required,
      ]],
      next_vacuna_date: [null, [
        Validators.required,
      ]],
      mascota: [null, [
        Validators.required,
      ]],
    });
    
 //   this.apiService.pet(this.loginService.getUserId()).subscribe(
    this.apiService.pet().subscribe(
      (res)=>{
        this.pets=res;
      },
      (err)=>{
        //MANEJAR ERROR
        console.log(err);

      }
    )
  }

  submit(){
    if(!this.createVaccineForm.valid) return;
    let value = {...this.createVaccineForm.value}
    value.date_vacuna = `${value.date_vacuna.getFullYear()}-${value.date_vacuna.getMonth()+1}-${value.date_vacuna.getDate()}`
    value.next_vacuna_date = `${value.next_vacuna_date.getFullYear()}-${value.next_vacuna_date.getMonth()+1}-${value.next_vacuna_date.getDate()}`

    this.apiService.crearVacuna(value).subscribe(
      (next)=>{
        console.log('Exito');

      },
      (error)=>{
        console.log('Error');
      }
    );
  }
}
