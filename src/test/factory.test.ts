import { expect, test } from "vitest";

interface INotification {
    type: string;
    send(message: string): void;
}

interface INotificationFactory {
    createNotification(type: INotification['type']): INotification;
}

class EmailNotification implements INotification {
    type = 'email'
    message: string = ''
    send(message: string): void {
       this.message = message;
    }
}

class TextNotification implements INotification {
    type = 'text';
    message = ''
    send(message: string): void {
        this.message = message;
    }
}

class NotificationFactory implements INotificationFactory {
    createNotification(type: string): INotification {
        let out: INotification;
        switch (type) {
            case 'email':
                out = new EmailNotification();
                break;
            case 'text':
                out = new TextNotification();
                break;
            default: 
                out = new TextNotification();
                break;
        }
        return out;
    }
}

test("it should instantiate the classes", () => {
    const notification = new NotificationFactory();
    const emailNotification = notification.createNotification('email');
    emailNotification.send('Hello!')
    expect(emailNotification.type).toEqual('email')
    expect(notification.createNotification('text').type).toEqual('text');
})

