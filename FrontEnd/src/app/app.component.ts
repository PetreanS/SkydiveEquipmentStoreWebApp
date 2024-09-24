import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'SkydiveEquipmentStore';

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit(){
    if(this.authService.getUser() === null){
      this.authService.resetUser()
      this.router.navigate(['/login']);
    }
  }
}
