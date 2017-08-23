import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogService {
  constructor(private http: Http) {

  }

  getPosts(pageNr) {
    const request_header = new Headers();
    request_header.set('accept', 'application/json');

    const searchParams = new URLSearchParams();
    searchParams.set('page', pageNr);

    return this.http.get(
      environment.backEndUrl + '/post',
      {
        headers: request_header,
        search: searchParams
      }
    ).map((res) => res.json());
  }
}
