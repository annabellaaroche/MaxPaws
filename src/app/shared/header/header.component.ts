import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/LoginService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'MaxPaws';
  sidenavToggle = true;
  dev = false;
  userLoginOn = false;
  userID=0;

  constructor(private loginService: LoginService){
    setInterval(()=>{
      this.userLoginOn = localStorage.getItem('userLoginOn') == 'true' ? true:false;
      this.userID=this.loginService.getUserId();
    },100
    )
  }
  
public logout(){
  this.loginService.logout().subscribe(
    (res)=>{
      console.log("Se Cerro la Sesion")
    }
  );
}
toggleDarkTheme(): void {
  document.body.classList.toggle('dark-theme');
}
  toggleSidenav(){
    this.sidenavToggle = !this.sidenavToggle;
    this.devLog('toggle sidebar')
  }
  toggleDev(){
    this.dev = !this.dev;
    this.devLog('toggle dev')
  }
  private devLog(message=''){
    let dev = document.getElementById('divdev');
    if(dev) dev.innerHTML += `<p>${message}</p>`;
  }
}