export class OrderHistory {
    id: string;
    orderTrackingNumber: string;
    totalPrice: number;
    totalQuantity: number;
    dateCreated: Date;
  
    constructor() {
      this.id = '';
      this.orderTrackingNumber = '';
      this.totalPrice = 0;
      this.totalQuantity = 0;
      this.dateCreated = new Date();
    }
  }