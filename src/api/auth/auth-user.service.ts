import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
  })
  export class AuthUserService {

    private API_URL= environment.API_URL;
    private userUrl = 'api/user'; 
    
    constructor(
      private http: HttpClient,
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
      return this.http.put(this.API_URL+this.userUrl+'/resetPassword/'+token, userPassword, )
    }

    getProfile(): Observable<any>{        
      return this.http.get(this.API_URL+this.userUrl+'/profile');
    }

    updateProfile(user: User): Observable<any>{        
      return this.http.put(this.API_URL+this.userUrl+'/profile', user);
    }

    updatePassword(userPassword: {password, confirmPassword},): Observable<any>{        
      return this.http.put(this.API_URL+this.userUrl+'/updatePassword', userPassword);
    }

    deleteProfile(): Observable<any>{        
      return this.http.delete(this.API_URL+this.userUrl+'/profile');
    }

    checkToken(): Observable<any>{        
      return this.http.get(this.API_URL+this.userUrl+'/profile');
    }
}