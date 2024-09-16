import { expect, test } from "vitest";

interface PayPalAccount {
    method: string;
    makeAccountPayment(): void;
}

interface CreditCardPayment {
    method: string;
    processCardPayment(): void;
}

class PayPal implements PayPalAccount {
    method = 'Paypal';
    public makeAccountPayment() {
        console.log('Processing payment through PayPal...');
    }
}

class CreditCard implements CreditCardPayment {
    method = 'Credit'
    public processCardPayment() {
        console.log('Processing payment through Credit Card...');
    }
}

class PayPalToCreditCardAdapter implements CreditCardPayment {
    private payPalAccount: PayPalAccount;
    public method = 'Credit'

    constructor(payPalAccount: PayPalAccount) {
        this.payPalAccount = payPalAccount;
    }

    public processCardPayment() {
        console.log('Adapting PayPal payment to Credit Card payment...');
        this.payPalAccount.makeAccountPayment();
    }
}

test("it should be able to use classes with diff interfaces", () => {
   const paypal = new PayPal();
   expect(paypal.method).toEqual('Paypal');
   const adapter = new PayPalToCreditCardAdapter(paypal);
   expect(adapter.method).toEqual('Credit')
} )