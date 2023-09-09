import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/auth/login.service';


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

registerForm = this.fb.group({
  email: 'annabella.aroche@gmail.com',
  password:'123456',
  user_name:'aarochem1',
  first_name: 'Annabellaas',
  last_name: 'aroches',
})
  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService) { }


  onSubmit(): void {
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as User).subscribe({
        next:(userData)=>{
          console.log(userData);
        },
        error:(errorData)=>{
          console.error(errorData);
          this.loginError = errorData;
          this.loginValid = false;
        },
        complete:()=>{
          console.info("Login completo");
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      });

/*      this.loginService.register(this.registerForm.value as User).subscribe({
        next:(userData)=>{
          console.log(userData);
        },
        error:(errorData)=>{
          console.error(errorData);
        }
      })*/
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
