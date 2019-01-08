import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class BlogService {
  constructor(private http: HttpClient) {

  }

  getPosts(pageNr) {
    const requestHeader = new HttpHeaders();
    requestHeader.set('accept', 'application/json');

    const searchParams = new HttpParams();
    searchParams.set('page', pageNr);

    return this.http.get(
      environment.backEndUrl + '/post',
      {
        headers: requestHeader,
        params: searchParams
      }
    );
  }
}
