import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from 'src/app/models/user';
import { GetParamsService } from '../get-params.service';


@Injectable({
    providedIn: 'root'
  })
  export class AuthUserService {

    private API_URL= environment.API_URL;
    private userUrl = 'api/user'; 
    
    constructor(
      private http: HttpClient,
      private httpParams: GetParamsService
    ) { }

    login(credentials: {email, password}): Observable<any>{        
        return this.http.post(this.API_URL+this.userUrl+'/login', credentials);
    }

    register(user: User): Observable<any>{        
      return this.http.post(this.API_URL+this.userUrl+'/register', user);
    }

    requestEmailPassword(userEmail: {email}): Observable<any>{        
      return this.http.post(this.API_URL+this.userUrl+'/requestEmailPassword', userEmail);
    }

    resetPassword(userPassword: {password, confirmPassword}, token): Observable<any>{           
      let params = this.httpParams.httpParamsFactory({'token': token});

      return this.http.put(this.API_URL+this.userUrl+'/resetPassword', userPassword, {params: params})
    }

    checkToken(): Observable<any>{        
      return this.http.get(this.API_URL+this.userUrl+'/profile');
    }
}