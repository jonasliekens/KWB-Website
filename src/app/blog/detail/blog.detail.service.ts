import {Injectable} from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogDetailService {
  constructor(private http: Http) {

  }

  getPost(post_id) {
    const request_header = new Headers();
    request_header.set('accept', 'application/json');

    return this.http.get(
      environment.backEndUrl + '/post/' + post_id,
      {
        headers: request_header
      }
    ).map((res) => res.json());
  }
}
