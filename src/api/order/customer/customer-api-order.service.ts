import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from 'src/app/models/order';
import { GetParamsService } from '../../get-params.service';


@Injectable({
    providedIn: 'root'
  })
  export class CustomerApiOrderService {

    private API_URL= environment.API_URL;
    private orderUrl = 'api/order'; 
    
    constructor(
      private http: HttpClient,
      private httpParams: GetParamsService
    ) { }



    getMyOrders(limit = null, offset = null, order = null): Observable<any>{ 
        let params = this.httpParams.httpParamsFactory({"limit": limit, "offset": offset, "order": order});  
        return this.http.get(this.API_URL+this.orderUrl+'/myOrders', {params: params});
     }


    getMyOrder(idOrder): Observable<any>{ 
      return this.http.get(this.API_URL+this.orderUrl+'/getMyOrder/'+idOrder);
    }
    
}