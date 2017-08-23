import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getUsers() {
    const request_header = new Headers();
    request_header.set('accept', 'application/json');

    // return this.http.get(environment.backEndUrl + '/user', {headers: request_header}).map((res) => res.json());
    return this.http.get('assets/data/bestuur.json').map((res: any) => res.json());
  }
}
