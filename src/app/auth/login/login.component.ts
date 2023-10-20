import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent {
  public loginValid = true;
  loginError:string="";

  hide = true;

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['', Validators.required],
  })

  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService, private apiService: ApiService) { }


  onSubmit(): void {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as User).subscribe({
        next:(userData)=>{
          console.info("Login completo");
          console.log(localStorage.getItem('access'));
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        },
        error:(errorData)=>{
          console.error(errorData);
          this.loginError = errorData;
          this.loginValid = false;
        },
        complete:()=>{
          
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
