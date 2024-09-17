import { expect, test } from "vitest";

interface Observer {
    updateValue(val: number): void;
    getValue(): number;
}

interface Subject {
    registerObserver(observer: Observer): void;
    unregisterObserver(observer: Observer): void;
    notifyObserver(): void;
}

class StockMarket implements Subject {
    private observers: Observer[] = []
    private val: number = 0;
    registerObserver(observer: Observer): void {
        this.observers.push(observer);
    }
    unregisterObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);

    }
    notifyObserver(): void {
       this.observers.forEach(observer => observer.updateValue(this.val))
    }   

    setStockValue(val: number) {
        this.val = val;
        this.notifyObserver();
    }
}

class StockMarketDisplay implements Observer {
    private subject: Subject;
    public val: number;
    constructor(sub: Subject) {
        this.subject = sub;
        this.subject.registerObserver(this);
    }
    updateValue(val: number): void {
        this.val = val;
    }

    getValue() {
        return this.val;
    }
}

class Trader implements Observer {
    private subject: Subject;
    private val: number;
    constructor(sub: Subject) {
        this.subject = sub;
        this.subject.registerObserver(this);
    }
    updateValue(val: number): void {
        this.val = val;
    }
    getValue(): number {
       return this.val;
    }

}

test("it should register observers and notify the value", () => {
    const stockMarket = new StockMarket();
    const display = new StockMarketDisplay(stockMarket);
    stockMarket.setStockValue(10);
    expect(display.getValue()).toBe(10);
})