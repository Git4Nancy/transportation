import { Component, OnInit,Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private sessionStorage: WebStorageService,private router: Router)  {
    if (this.sessionStorage.get("token")==null || this.sessionStorage.get("token")==undefined)
    this.router.navigate(['/']);
    else
    {  
      
        this.router.navigate(['/registration']);
  }
  }

  ngOnInit() {
   
  }


}
