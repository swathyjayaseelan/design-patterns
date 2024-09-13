import { expect, test } from 'vitest'

abstract class Command<T> {
    abstract execute(state: T): T;
    abstract undo(state: T): T;
}

class AddOne extends Command<number> {
    execute(state: number): number {
        return state + 1;
    }

    undo(state: number): number {
        return state - 1;
    }
}


class CommandHistory<T> {
    private stack: Array<Command<T>> = [];
    constructor(private _state: T) {}

    get state() {
        return this._state
    }
 
    execute(command: Command<T>) {
        this._state = command.execute(this._state)
        this.stack.push(command)
    }

    undo() {
        const command = this.stack.pop()
        if (command) {
            this._state = command.undo(this._state)
        }
    }
}

test("it should execute and rollback", () => {
    const commandHistory = new CommandHistory<number>(0);
    commandHistory.execute(new AddOne())
    expect(commandHistory.state).toEqual(1);
    commandHistory.execute(new AddOne())
    expect(commandHistory.state).toEqual(2);
    commandHistory.undo()
    commandHistory.undo()
    expect(commandHistory.state).toEqual(0);
} )
