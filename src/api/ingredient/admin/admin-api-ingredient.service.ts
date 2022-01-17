import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetParamsService } from '../../get-params.service';
import { Ingredient } from '../../../app/models/ingredient'


@Injectable({
    providedIn: 'root'
  })
  export class AdminApiIngredientService {

    private API_URL= environment.API_URL;
    private ingredientUrl = 'api/ingredient'; 
    
    constructor(
      private http: HttpClient,
      private httpParams: GetParamsService,
    ) { }

    createIngredient(ingredient: Ingredient): Observable<any>{        
      return this.http.post(this.API_URL+this.ingredientUrl+'/createIngredient', ingredient);
    }
  
}