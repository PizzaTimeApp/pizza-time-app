import { User } from "./user";

export class Order {
    id: string;
    idUser: User;
    status: Status;
}

export enum Status {
    new = "new",
    pendingPayment = "pending payment",
    processing = "processing",
    complete = "complete",
    closed = "closed",
    canceled = "canceled"
}
