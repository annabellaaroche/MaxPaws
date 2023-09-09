import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registerError:string="";
  registerCorrect!: boolean;
  loginValid!:boolean;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:['',Validators.required],
    user_name:['',Validators.required],
    first_name: ['',Validators.required],
    last_name: ['',Validators.required],
  })
    constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService) { }
  

    onSubmit(): void {
      if(this.registerForm.valid){
        this.loginService.register(this.registerForm.value).subscribe({
          next:(userData)=>{
            console.log(userData);
          },
          error:(errorData)=>{
            console.error(errorData);
            this.registerError = errorData;
            this.loginValid=false;
            /*this.loginValid = false;*/
          },
          complete:()=>{
            this.registerForm.reset();
            this.loginValid=true;
            this.registerCorrect=true;

          }
        });

      }else{
        this.registerForm.markAllAsTouched();
      }
    }
}
