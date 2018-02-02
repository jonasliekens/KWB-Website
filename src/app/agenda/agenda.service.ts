import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AgendaService {
  constructor(private http: HttpClient) {
  }

  getEvents(pageNr) {
    const searchParams = new HttpParams()
        .set('page', pageNr)
        .set('fromDate', moment().format('DD/MM/YYYY'));

    return this.http.get(environment.backEndUrl + '/event', { params: searchParams });
  }
}
