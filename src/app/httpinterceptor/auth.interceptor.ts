import { Inject,Injectable } from '@angular/core';
import { HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  

  constructor(@Inject(SESSION_STORAGE) private sessionStorage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionStorage.get("token")!=null || this.sessionStorage.get("token")!=undefined)
    {
    
    request = request.clone({
      setHeaders: {
        Authorization: `${this.sessionStorage.get("token")}`
      }
    });
  }
    return next.handle(request);
  }

  ngOnInit() {

  }
}