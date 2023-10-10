import { Component } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pets: any[] = [];
  constructor(private apiService: ApiService, private loginService: LoginService) {
    apiService.pet(loginService.getUserId()).subscribe(
      (res) => {
        this.pets = res;
      },
      (err) => {
        //MANEJAR ERROR
        console.log(err);

      }
    )
  }

OnClick(){

}

}
