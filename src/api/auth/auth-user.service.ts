import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class AuthUserService {

    private API_URL= environment.API_URL;
    private userUrl = 'api/user'; 
    
    constructor(private http: HttpClient) { }

    login(credentials: {email, password}): Observable<any>{        
        return this.http.post(this.API_URL+this.userUrl+'/login', credentials);
    }

    checkToken(): Observable<any>{        
      return this.http.get(this.API_URL+this.userUrl+'/profile');
    }
  }