import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HomeService {
    constructor(private http: HttpClient) {

    }

    getLatestPosts() {
        return this.http.get(
            environment.backEndUrl + '/post/latest'
        );
    }

    getNextEvent() {
        return this.http.get(
            environment.backEndUrl + '/event/next'
        );
    }
}
