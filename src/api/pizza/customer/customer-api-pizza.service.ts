import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePizza } from 'src/app/models/pizza';
import { GetParamsService } from '../../get-params.service';


@Injectable({
    providedIn: 'root'
  })
  export class CustomerApiPizzaService {

    private API_URL= environment.API_URL;
    private pizzaUrl = 'api/pizza'; 
  
    constructor(
      private http: HttpClient,
      private httpParams: GetParamsService,
    ) { }

    createPizza(pizza:any): Observable<any>{
      return this.http.post(this.API_URL+this.pizzaUrl+'/createPizza', pizza);
    }

    getImagePizza(image:any) {
      return this.API_URL+this.pizzaUrl+'/getImagePizza/'+image;
    }
    
    getPizzas(type = "admin", limit = null, offset = null, order = null): Observable<any>{ 
      let params = this.httpParams.httpParamsFactory({"limit": limit, "offset": offset, "order": order, "type": type});
      
      return this.http.get(this.API_URL+this.pizzaUrl+'/getPizzas', {params: params});
    }
  
}