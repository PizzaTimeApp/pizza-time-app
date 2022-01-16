import { Component } from '@angular/core';
import { CustomerApiIngredientService } from 'src/api/ingredient/customer/customer-api-ingredient.service';
import { CustomerApiPizzaService } from 'src/api/pizza/customer/customer-api-pizza.service';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { CartModalPage } from '../cart/cart-modal/cart-modal.page';
import { Ingredient } from '../../../../models/ingredient';
@Component({
  selector: 'app-browse',
  templateUrl: 'browse.page.html',
  styleUrls: ['browse.page.scss']
})
export class BrowsePage {
  private Pizzas = [];
  showPizzas = [];
  private searchWord = "";
  openModal = false;
  ingredients = [];
  ingredientsDislike = [];


  constructor(
    private customerApiPizza : CustomerApiPizzaService, 
    private customerApiIngredient : CustomerApiIngredientService,
    private modal: ModalComponent,
    ) {}

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

  // ingredientChanged(ev:any) {
  //   console.log(this.ingredientsDislike);
  //   console.log(ev);
  //   // this.customerApiPizza.getPizzas(ev.detail.value).subscribe((data)=>{
  //   //   this.Pizzas = data.body.pizzas;
  //   //   this.getFilteredPizza();
  //   // });
  // }

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
  
  // getPizzaIngredient(pizza) {
  //   let pizzaIngredient = [];
  //   for(let i = 0; i < pizza.ingredient.length; i++) {
  //   // pizzas.forEach(pizza => {
  //     if(pizza.ingredient.length > 0) {        
  //       pizzaIngredient.push(pizza.ingredient[i].id);
  //       // pizza.ingredient.forEach(ingredient => {
  //       //   pizzaIngredient.push(ingredient.id);
  //       // });
  //     } else {
  //       pizzaIngredient = [];
  //     }
  //   // });    
  //   return pizzaIngredient;
  //  }
  // }

  segmentChanged(ev: any) {
    this.customerApiPizza.getPizzas(ev.detail.value).subscribe((data)=>{
      this.Pizzas = data.body.pizzas;
      this.getFilteredPizza();
    });
  }

  async getFilteredPizza(query = this.searchWord) {    
    this.showPizzas = this.Pizzas
    .filter(pizza => pizza.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
  
  async presentModal(pizza = null) {
    this.modal.presentModal(CartModalPage, "cart-modal", pizza);
  }
  
}
