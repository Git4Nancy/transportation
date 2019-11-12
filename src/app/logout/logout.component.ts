import { Component, OnInit,Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
  private router: Router) { }

  ngOnInit() {
    this.storage.remove("token");
    this.router.navigate(['/']);
  }

}
