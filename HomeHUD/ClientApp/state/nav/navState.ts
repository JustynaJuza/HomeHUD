export interface ISelectedContent {
    type: string;
    id?: number;
}

export interface IError {
    code?: string;
    message: string;
}

export class SelectedContent implements ISelectedContent{

    public type: string;
    public id: number;

    constructor(type: string, id?: number) {

        this.type = type;
        this.id = id;
    }
}

export interface INavState {
    selectedContent: ISelectedContent;
    error: IError;
    route: string;
}