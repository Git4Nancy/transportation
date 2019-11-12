import { Component, OnInit,Inject } from '@angular/core';
import { LoginService } from '../login.service';
import { Login } from '../util/login';
import { SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
currentLogin:Login=null;
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
  private loginService:LoginService,private router: Router) { }

  ngOnInit() {
    this.currentLogin=new Login();
  }
verify()
{
this.loginService.verifyLogin(this.currentLogin).subscribe(resp=>{
  this.storage.set("token", "Bearer "+resp.token);
  // this.storage.remove("token");
  this.router.navigate(['/registration']);
  
},error =>{
  if (error.status === 401) 
                   alert("Invalid credentials.");
               else 
                   alert("Error");
});
  }

}

