import { Component } from '@angular/core';

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