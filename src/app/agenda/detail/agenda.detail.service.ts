import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AgendaDetailService {
  constructor(private http: Http) {
  }

  getEvent(event_id) {
    const request_header = new Headers();
    request_header.set('accept', 'application/json');

    return this.http.get(environment.backEndUrl + '/event/' + event_id, {headers: request_header}).map((res) => res.json());
  }
}
