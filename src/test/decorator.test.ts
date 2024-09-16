import { expect, test } from "vitest";

abstract class Pizza {
    public description: string = '';
    
    getDescription() {
        return this.description;
    }

    abstract cost(): number;
}

abstract class PizzaDecorator extends Pizza{
    decoratedPizza!: Pizza;
    public abstract getDescription(): string;
}

class CheesePizza extends Pizza {
    public description = 'Cheese Pizza'
    cost(): number {
       return 20;
    }
}

class VeggiePizza extends Pizza {
    public description = 'Veggie Pizza'
    cost(): number {
       return 30;
    }
}
class ExtraCheesePizza extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super();
        this.decoratedPizza = pizza
    }
    public getDescription(): string {
        return this.decoratedPizza.getDescription() + 'Extra Cheese'
    }
    cost(): number {
        return this.decoratedPizza.cost() + 10;
    } 
}

class OliveTopping extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super();
        this.decoratedPizza = pizza
    }
    public getDescription(): string {
        return this.decoratedPizza.getDescription() + 'With Olives'
    }
    cost(): number {
        return this.decoratedPizza.cost() + 5;
    }
}

test("it should be able to extend the options by decorating", () => {
    let pizza = new CheesePizza();
    expect(pizza.cost()).toBe(20);
    pizza = new ExtraCheesePizza(pizza);
    expect(pizza.cost()).toBe(30);
    pizza = new OliveTopping(pizza);
    expect(pizza.cost()).toBe(35);
})