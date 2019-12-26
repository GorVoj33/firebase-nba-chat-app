import { AlertType } from './alertType.model';


export class Alert {
    text: string;
    type: AlertType;

    constructor(text, type = AlertType.Success) {
        this.text = text;
        this.type = type;
    }
}
