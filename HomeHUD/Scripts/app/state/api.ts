import 'whatwg-fetch';

export class Api {

    private getRequestSettings: RequestInit;
    private postRequestSettings: RequestInit;

    constructor() {

        //var jsonHeaders = new Headers();
        //jsonHeaders.set('Content-Type', 'application/json');

        this.getRequestSettings = {
            method: 'get',
            headers: {
                'Content-Type':
                'application/json'
            },
            cache: 'default'
        };

        this.postRequestSettings = {
            method: 'post',
            headers: {
                'Content-Type':
                'application/json'
            },
            credentials: 'include'
        };
    }

    private processStatus(response: any): any {
        if (response.status === 200 || response.status === 0) {
            return response;
        } else {
            return Promise.reject(new Error(response.headers.get('message') || response.statusText));
        }
    }

    public getJson(url: string): any {
        return fetch(url, this.getRequestSettings)
            .then(this.processStatus);
    }

    public postJson(url: string, data: any): void {
        this.postRequestSettings.body = JSON.stringify(data);

        fetch(url, this.postRequestSettings)
            .then(this.processStatus);
    }
}