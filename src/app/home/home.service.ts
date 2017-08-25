import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class HomeService {
    constructor(private http: Http) {

    }

    getLatestPosts() {
        const requestHeader = new Headers();
        requestHeader.set('accept', 'application/json');

        return this.http.get(
            environment.backEndUrl + '/post/latest',
            {
                headers: requestHeader
            }
        ).map((res) => res.json());
    }

    getNextEvent() {
        const requestHeader = new Headers();
        requestHeader.set('accept', 'application/json');

        return this.http.get(
            environment.backEndUrl + '/event/next',
            {
                headers: requestHeader
            }
        ).map((res) => res.json());
    }
}
