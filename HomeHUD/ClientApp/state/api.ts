import 'isomorphic-fetch';


export class Api {

    private getRequestSettings: RequestInit;
    private postRequestSettings: RequestInit;

    constructor() {

        var jsonHeaders = new Headers();
        jsonHeaders.set('Content-Type', 'application/json; charset=UTF-8');

        this.getRequestSettings = {
            method: 'get',
            headers: jsonHeaders,
            cache: 'default',
            credentials: 'include'
        };

        this.postRequestSettings = {
            method: 'post',
            headers: jsonHeaders,
            credentials: 'include'
        };
    }

    private processStatus(response: Response): any {
        if (response.status === 200 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.headers.get('message') || response.statusText));
        }
    }

    public getJson<T>(url: string): Promise<T> {
        return fetch(url, this.getRequestSettings)
            .then(this.processStatus)
            .then(response => response.json() as Promise<T>);
    }

    public postJson<T>(url: string, data?: any): Promise<T> {
        this.postRequestSettings.body = JSON.stringify(data);

        return fetch(url, this.postRequestSettings)
            .then(this.processStatus)
            .then(response => response.json() as Promise<T>);
    }
}