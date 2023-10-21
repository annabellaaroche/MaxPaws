import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/LoginService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  title = 'MaxPaws';
  sidenavToggle = true;
  dev = false;
  userLoginOn = false;
  userID = 0;

  constructor(private loginService: LoginService) {
    setInterval(() => {
      this.userLoginOn = localStorage.getItem('userLoginOn') == 'true' ? true : false;
      this.userID = this.loginService.getUserId();
    }, 100
    )
  }

  public logout() {
    this.loginService.logout().subscribe(
      (res) => {
        console.log("Se Cerro la Sesion")
      }
    );
  }
  dark=false;
  
  toggleDarkTheme(): void {
    this.dark = !this.dark;
    if(this.dark) document.documentElement.setAttribute('data-bs-theme', 'dark');
    else document.documentElement.setAttribute('data-bs-theme', 'light');
  }


}