import { Ingredient } from "./ingredient";

export class Pizza {
    id: string;
    name: string;
    price: string;
    image: string;
    content: string;
    ingredients: Ingredient;
}
export class CreatePizza {
    name: string;
    price: string;
    image: string;
    content: string;
    ingredients: any;
}
