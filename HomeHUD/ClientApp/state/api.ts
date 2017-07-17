import 'isomorphic-fetch';

interface IAntiforgeryToken {
    headerName: string;
    token: string;
}


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
            credentials: 'same-origin'
        };

        this.postRequestSettings = {
            method: 'post',
            headers: jsonHeaders,
            credentials: 'same-origin'
        };
    }

    private processStatus(response: Response): Response {
        if (response.status === 200 || response.status === 0) {
            return response;
        }

        Promise.reject(new Error(response.headers.get('message') || response.statusText));
    }

    public getJson<T>(url: string): Promise<T> {
        return fetch(url, this.getRequestSettings)
            .then(this.processStatus)
            .then(response => response.json() as Promise<T>);
    }

    private getAntiforgeryToken() {
        return this.getJson<IAntiforgeryToken>('/token/antiforgery')
            .then(antiforgeryToken => this.postRequestSettings.headers.set(antiforgeryToken.headerName, antiforgeryToken.token));
    }

    public postJson<T>(url: string, data?: any): Promise<T> {
        return Promise.resolve(this.getAntiforgeryToken())
            .then(() => {
                this.postRequestSettings.body = JSON.stringify(data);

                return fetch(url, this.postRequestSettings)
                    .then(this.processStatus)
                    .then(response => response.json() as Promise<T>)
            });
    }
}