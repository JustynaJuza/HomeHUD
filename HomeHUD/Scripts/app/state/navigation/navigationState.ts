export interface ISelectedContent {
    type: string;
    id?: number;
}

export class SelectedContent implements ISelectedContent{

    public type: string;
    public id: number;

    constructor(type: string, id?: number) {

        this.type = type;
        this.id = id;
    }
}

export interface INavigationState {
    selectedContent: ISelectedContent;
    errorMessage: string;
    route: string;
}