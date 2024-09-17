import { expect, test, vi } from "vitest";

abstract class ProcessOrder {
   processOrder() {
    this.validateOrder();
    this.processPayment();
    this.prepareOrder();
    this.shipOrder();
    this.sendConfirmation();
   }

   validateOrder() {
    console.log('Validating Order')
   }
   processPayment() {
    console.log('Processing payment')
   }
   sendConfirmation() {
    console.log('Sending Confirmation')
   }
   abstract prepareOrder(): void;
   abstract shipOrder(): void;
}

class DigitalOrder extends ProcessOrder {
    prepareOrder(): void {
        console.log('Preparing Digital Order');
    }
    shipOrder(): void {
        console.log('Emailing Order');
    }
}

class PhysicalOrder extends ProcessOrder {
    prepareOrder(): void {
        console.log('Preparing Physical Order');
        
    }
    shipOrder(): void {
        console.log('Shipping Order');
    }
}

test("it should create skeleton and hvae common methods", () => {
    const logSpy = vi.spyOn(console, 'log');
    const digiOrder = new DigitalOrder();
    digiOrder.processOrder();
    expect(logSpy).toHaveBeenCalledWith('Validating Order');
    expect(logSpy).toHaveBeenCalledWith('Processing payment');
    expect(logSpy).toHaveBeenCalledWith('Preparing Digital Order');
    expect(logSpy).toHaveBeenCalledWith('Emailing Order');
    expect(logSpy).toHaveBeenCalledWith('Sending Confirmation');
})