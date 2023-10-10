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

  createPetForm: FormGroup;
  pets:any[]=[];
  raza:any[]=[];
  size:any[]=[];
  gender = [{id:1,name:'Macho'},{id:1,name:'Hembra'}]
  constructor(
    public formBuilder: FormBuilder, private loginService: LoginService, private apiService: ApiService
  ) {
    this.createPetForm = this.formBuilder.group({
      name_pet: ['', [
        Validators.required,
      ]],
      birth_date_pet: [null, [
        Validators.required,
      ]],
      raza_id: [null, [
        Validators.required,
      ]],
      pet_size_id: [null, [
        Validators.required,
      ]],
      pet_gender: ['', [
        Validators.required,
      ]],
      pet_color: ['', [
        Validators.required,
      ]],
      owner: [0, [
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

    this.apiService.raza().subscribe(
      (res)=>{
        this.raza=res;
      },
      (err)=>{
        //MANEJAR ERROR
        console.log(err);
  
      }
    )

    this.apiService.petSize().subscribe(
      (res)=>{
        this.size=res;
      },
      (err)=>{
        //MANEJAR ERROR
        console.log(err);
  
      }
    )
  }

  submit(){
    if(!this.createPetForm.valid) return;
    let value = {...this.createPetForm.value}
    value.birth_date_pet = `${value.birth_date_pet.getFullYear()}-${value.birth_date_pet.getMonth()+1}-${value.birth_date_pet.getDate()}`
    //value.owner = this.loginService.getUserId() CAMBIAR
    value.owner = this.loginService.getUserId();
    this.apiService.crearMascota(value).subscribe(
      (next)=>{
        console.log('Exito');
      },
      (error)=>{
        console.log('Error');
      }
    );
  }
}
