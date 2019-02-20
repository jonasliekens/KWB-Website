import {Component, OnInit, TemplateRef} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public isCollapsed = true;
    modalRef: BsModalRef;
    loginForm: FormGroup;
    loginErrorMsg: String;
    authenticated = false;

    constructor(
        private authService: AngularFireAuth,
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private router: Router) {

    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onLoginSubmit() {
        // stop here if form is invalid
        this.loginErrorMsg = '';
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.auth.signInWithEmailAndPassword(
            this.loginForm.controls.email.value,
            this.loginForm.controls.password.value).then((cred) => {
            this.modalRef.hide();
            this.loginForm.reset();
            console.log(cred);
            this.authenticated = true;
        }).catch((error) => {
            this.loginErrorMsg = error.message;
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    logout() {
        this.authService.auth.signOut().then(() => {
            this.authenticated = false;
            this.router.navigate(['/home']);
        }).catch(() => {
            console.log('Something went wrong signing out...');
        });
    }
}
