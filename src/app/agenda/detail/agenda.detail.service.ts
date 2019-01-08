import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AgendaDetailService {
  constructor(private http: HttpClient) {
  }

  getEvent(eventId) {
    return this.http.get(environment.backEndUrl + '/event/' + eventId);
  }
}
