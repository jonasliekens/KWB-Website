import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BlogDetailService {
  constructor(private http: HttpClient) {

  }

  getPost(postId) {
    return this.http.get(
      environment.backEndUrl + '/post/' + postId,
    );
  }
}
