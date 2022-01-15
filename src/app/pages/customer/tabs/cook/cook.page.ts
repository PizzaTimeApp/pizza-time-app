import { Component } from '@angular/core';
import { CustomerApiIngredientService } from 'src/api/ingredient/customer/customer-api-ingredient.service';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { CreatePizza } from 'src/app/models/pizza';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-cook',
  templateUrl: 'cook.page.html',
  styleUrls: ['cook.page.scss']
})
export class CookPage {
  ingredients = [];
  photo= "../../../../../assets/camera.jpeg";
  ingredientsSelected = [];
  openModal = false;
  PizzaCreate:CreatePizza = {
    name: '',
    price: '',
    image: '',
    content: '',
    ingredients: []
  };


  constructor(
    private customerApiIngredient : CustomerApiIngredientService, 
    private customerApiPizzaService: CustomerApiPizzaService,
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private router:Router,
    ) {}

    
  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
    console.log(image.dataUrl);
    this.photo = image.dataUrl;
    this.PizzaCreate.image = image.dataUrl;
  }
    
  ngOnInit(){

    this.customerApiIngredient.getIngredients().subscribe((data)=>{
      this.ingredients = data.body.ingredients.map(ingredient=> {
        let ingredientCheck = ingredient;
        ingredientCheck.isChecked = false;
        return ingredientCheck;
      });
    });
  }

  openModalHandler(){
    this.openModal = true;
  }

  dismissModalHandler(){
    this.openModal = false;
    this.ingredientsSelected = this.ingredients.filter(ingredient => ingredient.isChecked == true);
    
    let ingredients = [];
    this.ingredientsSelected.forEach(ingr => {
      ingredients.push(ingr.id);
    });
    this.PizzaCreate.ingredients = ingredients
  }

  removeIngredient(idIngredient){
    this.ingredientsSelected = this.ingredientsSelected.filter(ingredient=> ingredient.id != idIngredient);
    this.ingredients = this.ingredients.map(ingredient=> {
      if(ingredient.id == idIngredient){
        ingredient.isChecked = false
      }
      return ingredient
    });
    
    this.PizzaCreate.ingredients = this.PizzaCreate.ingredients.filter(ingredient=> ingredient != idIngredient);
    console.log("Ingredient remove : " + idIngredient);
  }

  changedTitle(e:any){
    this.PizzaCreate.name = e.detail.value;
    
  }
  changedDescription(e:any){
    this.PizzaCreate.content = e.detail.value;

  }
  changedPrice(e:any){
    this.PizzaCreate.price = e.detail.value;
    
  }

  async createPizza(){
    const loading = await this.loading.createLoading();

    this.customerApiPizzaService.createPizza(this.PizzaCreate).subscribe(
      async (res) => {
        console.log(res);
        await loading.onDidDismiss();
        await this.alert.presentAlert('Votre pizza à été créé !',"bonne appétit", ['Merci !']);
        this.router.navigateByUrl('/app/user/home', { replaceUrl: true});
      },
      async (err) => {
        console.log(err);
        await loading.onDidDismiss();
        this.alert.presentAlert('Un problème est survenu', "Si l'erreur perciste contactez le support", ['Réessayer']);
      }
    );
    
  }

}
