import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaxPaws';
  sidenavToggle = true;
  dev = false;

  
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
