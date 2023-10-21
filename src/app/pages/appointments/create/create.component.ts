import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  editForm: FormGroup;
  pets: any[] = [];
  constructor(
    public formBuilder: FormBuilder, private loginService: LoginService, private apiService: ApiService,private router:Router
  ) {
    this.editForm = this.formBuilder.group({
      fecha_cita: [null, [
        Validators.required,
      ]],
      motivo_cita: ['', [
        Validators.required,
      ]],
      notas_cita: ['', [
      ]],
      mascota: [null, [
        Validators.required,
      ]],
    });

    this.apiService.pet(this.loginService.getUserId()).subscribe(
      (res) => {
        this.pets = res;
      },
      (err) => {
        //MANEJAR ERROR
        console.log(err);

      }
    )
  }

  submit() {
    if (!this.editForm.valid) return;
    let value = { ...this.editForm.value }
    value.fecha_cita = `${value.fecha_cita.getFullYear()}-${value.fecha_cita.getMonth() + 1}-${value.fecha_cita.getDate()}`
    this.apiService.crearCita(value).subscribe(
      (next) => {
        console.log('Exito');
        this.router.navigateByUrl('/appointments');
      },
      (error) => {
        console.log('Error');
      }
    );
  }
}

