import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogService {
  constructor(private http: Http) {

  }

  getPosts(pageNr) {
    const requestHeader = new Headers();
    requestHeader.set('accept', 'application/json');

    const searchParams = new URLSearchParams();
    searchParams.set('page', pageNr);

    return this.http.get(
      environment.backEndUrl + '/post',
      {
        headers: requestHeader,
        search: searchParams
      }
    ).map((res) => res.json());
  }
}
