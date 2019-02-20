import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/nl-be';

@Component({
    templateUrl: './admin.blog.component.html',
    providers: []
})
export class AdminBlogComponent {
    posts: Observable<any[]>;
    modalRef: BsModalRef;
    postForm: FormGroup;
    tempPostId: string;

    constructor(private db: AngularFirestore,
                private modalService: BsModalService,
                private formBuilder: FormBuilder) {
        this.posts = this.db.collection('post', ref => ref.orderBy('timestamp', 'desc')).snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );

        this.postForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            body: ['', [Validators.required]],
        });

        this.modalService.onHide.subscribe(() => {
            this.tempPostId = null;
            this.postForm.reset();
        });
    }

    get pf() {
        return this.postForm.controls;
    }

    onSubmit() {
        if (this.postForm.valid) {
            if (this.tempPostId) {
                let post = {
                    title: this.pf.title.value,
                    body: this.pf.body.value
                };

                this.db.collection('post').doc(this.tempPostId).update(post).then(() => {
                    this.tempPostId = null;
                    this.postForm.reset();
                    this.modalRef.hide();
                }).catch(error => {
                    console.log(error);
                });
            } else {
                let post = {
                    title: this.pf.title.value,
                    body: this.pf.body.value,
                    timestamp: new Date()
                };

                this.db.collection('post').add(post).then(() => {
                    this.postForm.reset();
                    this.modalRef.hide();
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    convertSecondsToDate(seconds: number): String {
        return moment.unix(seconds).format('MM/DD/YYYY HH:mm');
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    openConfirmationModal(template: TemplateRef<any>, eventId: string) {
        this.tempPostId = eventId;
        this.modalRef = this.modalService.show(template);
    }

    openEditPostModal(template: TemplateRef<any>, eventId: string) {
        this.tempPostId = eventId;

        this.db.collection('post').doc(eventId).ref.get().then(doc => {
            if (doc.exists) {
                let post = doc.data();
                this.pf.title.setValue(post.title);
                this.pf.body.setValue(post.body);
                this.modalRef = this.modalService.show(template);
            } else {
                console.log('Post does not exist');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    confirmDelete() {
        if (this.tempPostId) {
            this.db.collection('post').doc(this.tempPostId).delete().then(() => {
                console.log('Post #' + this.tempPostId + ' deleted.');
                this.tempPostId = null;
            }).catch(error => {
                console.log(error);
                this.tempPostId = null;
            });
        } else {
            console.log('No post ID to delete.');
        }

        this.modalRef.hide();
    }

    declineDelete() {
        this.modalRef.hide();
        this.tempPostId = null;
    }
}
