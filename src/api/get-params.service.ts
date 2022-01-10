import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class GetParamsService {

    constructor() { }

    httpParamsFactory(parameters: {[key: string]: string}) {
        let httpParams: HttpParams = new HttpParams();

        for(let key in parameters) {
            if(parameters[key]) {
            httpParams = httpParams.append(key, parameters[key])
            }
        }
        return httpParams;
    }
}