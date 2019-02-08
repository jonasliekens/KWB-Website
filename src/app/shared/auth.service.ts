import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthService {
    authenticated: Boolean = false;

    constructor(
        public auth: AngularFireAuth,
        public router: Router) {
        this.auth.auth.onAuthStateChanged((user) => {
            this.authenticated = !!user;
        });
    }
}
