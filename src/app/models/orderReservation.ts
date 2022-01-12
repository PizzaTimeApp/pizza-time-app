import { Pizza } from "./pizza";
import { Order } from "./order";

export class OrderReservation {
    id: string;
    quantity: number;
    idPizza : Pizza;
    idOrder: Order;
}