import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetParamsService } from '../../get-params.service';


@Injectable({
    providedIn: 'root'
  })
  export class CustomerApiIngredientService {

    private API_URL= environment.API_URL;
    private userUrl = 'api/ingredient'; 
    
    constructor(
      private http: HttpClient,
      private httpParams: GetParamsService,
    ) { }


    getIngredients(limit = null, offset = null, order = null): Observable<any>{ 
      let params = this.httpParams.httpParamsFactory({"offset": offset, "order": order, "limit": limit});
      
      return this.http.get(this.API_URL+this.userUrl+'/getIngredients', {params: params});
    }
  
}