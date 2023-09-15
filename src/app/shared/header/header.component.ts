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
  

  constructor(private loginService: LoginService){
    setInterval(()=>{
      this.userLoginOn = localStorage.getItem('userLoginOn') == 'true' ? true:false;
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