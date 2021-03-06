import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CustomerApiIngredientService } from 'src/api/ingredient/customer/customer-api-ingredient.service';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';
import { ToastComponent } from '../../../../components/alerts/toast/toast.component';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.page.html',
  styleUrls: ['./create-pizza.page.scss'],
})
export class CreatePizzaPage implements OnInit {

  ingredients = [];
  ingredientsSelected = [];
  photo= "../../../../../assets/camera.jpeg";
  openModal = false;
  pizzaCreated: FormGroup;

  constructor(
    private customerApiIngredient : CustomerApiIngredientService, 
    private customerApiPizzaService: CustomerApiPizzaService,
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private router:Router,
    private fb: FormBuilder,
    private toast: ToastComponent
  ) {}

  ngOnInit(){
    this.customerApiIngredient.getIngredients().subscribe((data)=>{
      this.ingredients = data.body.ingredients.map(ingredient=> {
        let ingredientCheck = ingredient;
        ingredientCheck.isChecked = false;
        return ingredientCheck;
      });
    })

    this.pizzaCreated = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      content: ['', Validators.required],
      ingredients: [[], Validators.required]
    })
  }

  get name() {
    return this.pizzaCreated.get('name');
  }
  get price() {
    return this.pizzaCreated.get('price');
  }
  get image() {
    return this.pizzaCreated.get('image');
  }
  get content() {
    return this.pizzaCreated.get('content');
  }
  get pizzaIngredients() {
    return this.pizzaCreated.get('ingredients');
  }
  get f() { return this.pizzaCreated.controls; }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });    
    this.photo = image.dataUrl;  
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
    this.ingredients = ingredients
  }

  removeIngredient(idIngredient){
    this.ingredientsSelected = this.ingredientsSelected.filter(ingredient=> ingredient.id != idIngredient);
    this.ingredients = this.ingredients.map(ingredient=> {
      if(ingredient.id == idIngredient){
        ingredient.isChecked = false
      }
      return ingredient
    });
    
    this.f.ingredients = <any> this.f.pizzaIngredients.value.filter(ingredient=> ingredient != idIngredient);
    console.log("Ingredient remove : " + idIngredient);
  }

  async createPizza(){
    const loading = await this.loading.createLoading();
    
    this.f.image.setValue(this.photo);
    this.f.ingredients.setValue(this.ingredients);

    this.pizzaCreated.patchValue(this.f.value);
       
    this.customerApiPizzaService.createPizza(this.pizzaCreated.value).subscribe(
      async (res) => {
        // console.log(res);
        await loading.onDidDismiss();
        this.toast.presentToast('Pizza ajout??e avec succ??s !', 3000);
        this.router.navigateByUrl('/app/admin/pizza', { replaceUrl: true});
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        this.alert.presentAlert('Un probl??me est survenu', "Si l'erreur persiste contacter le support", ['R??essayer']);
      }
    );
    
  }

}

