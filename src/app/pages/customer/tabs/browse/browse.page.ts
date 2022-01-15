import { Component } from '@angular/core';
import { CustomerApiIngredientService } from 'src/api/ingredient/customer/customer-api-ingredient.service';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
@Component({
  selector: 'app-browse',
  templateUrl: 'browse.page.html',
  styleUrls: ['browse.page.scss']
})
export class BrowsePage {
  private Pizzas = [];
  showPizzas = [];
  private searchWord = "";
  imageURL = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
  openModal = false;
  ingredients = [];
  ingredientsDislike = [];


  constructor(private customerApiPizza : CustomerApiPizzaService, private customerApiIngredient : CustomerApiIngredientService) {}

  ngOnInit() {
    this.customerApiPizza.getPizzas("admin").subscribe((data)=>{
      this.Pizzas = data.body.pizzas;
      this.showPizzas = this.Pizzas;
    });
    this.customerApiIngredient.getIngredients().subscribe((data)=>{
      this.ingredients = data.body.ingredients.map(ingredient=> {
        let ingredientCheck = ingredient;
        ingredientCheck.isChecked = false;
        return ingredientCheck;
      });
    });
  
  }

  searchChanged(ev:any) {
    this.searchWord = ev.detail.value;
    this.getFilteredPizza(ev.detail.value);
  }

  removeIngredient(idIngredient){
    this.ingredientsDislike = this.ingredientsDislike.filter(ingredient=> ingredient.id != idIngredient);
    this.ingredients = this.ingredients.map(ingredient=> {
      if(ingredient.id == idIngredient){
        ingredient.isChecked = false
      }
      return ingredient
    });
    console.log("Ingredient remove : " + idIngredient);
  }

  openModalHandler(){
    this.openModal = true;
  }

  dismissModalHandler(){
    this.openModal = false;
    this.ingredientsDislike = this.ingredients.filter(ingredient => ingredient.isChecked == true);
  }

  segmentChanged(ev: any) {
    this.customerApiPizza.getPizzas(ev.detail.value).subscribe((data)=>{
      this.Pizzas = data.body.pizzas;
      console.log(this.Pizzas);
      this.getFilteredPizza();
    });
  }

  async getFilteredPizza(query = this.searchWord) {
    console.log(this.Pizzas);
    
    this.showPizzas = this.Pizzas
    .filter(pizza => pizza.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
  
  getImagePizza(image:any) {
    return this.customerApiPizza.getImagePizza(image);
  }

  
}
