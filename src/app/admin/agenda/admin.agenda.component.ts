import {Component, TemplateRef} from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/nl-be';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    templateUrl: './admin.agenda.component.html',
    providers: []
})
export class AdminAgendaComponent {
    events: Observable<any[]>;
    modalRef: BsModalRef;
    eventForm: FormGroup;
    tempEventId: string;

    constructor(private db: AngularFirestore,
                private modalService: BsModalService,
                private formBuilder: FormBuilder) {
        this.events = this.db.collection('event', ref => ref.orderBy('start')).snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
        );

        this.eventForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            location: ['', [Validators.required]],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]]
        });

        this.modalService.onHide.subscribe(() => {
            this.tempEventId = null;
            this.eventForm.reset();
        });
    }

    get ef() {
        return this.eventForm.controls;
    }

    onSubmit() {
        if (this.eventForm.valid) {
            let event = {
                title: this.ef.title.value,
                location: this.ef.location.value,
                start: moment(this.ef.start.value, 'DDMMYYYYhhmm').toDate(),
                end: moment(this.ef.end.value, 'DDMMYYYYhhmm').toDate(),
                description: this.ef.description.value
            };

            if (this.tempEventId) {
                this.db.collection('event').doc(this.tempEventId).update(event).then(() => {
                    this.tempEventId = null;
                    this.eventForm.reset();
                    this.modalRef.hide();
                }).catch(error => {
                    console.log(error);
                });
            } else {
                this.db.collection('event').add(event).then(() => {
                    this.eventForm.reset();
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
        this.tempEventId = eventId;
        this.modalRef = this.modalService.show(template);
    }

    openEditEventModal(template: TemplateRef<any>, eventId: string) {
        this.tempEventId = eventId;

        this.db.collection('event').doc(eventId).ref.get().then(doc => {
            if (doc.exists) {
                let event = doc.data();
                this.ef.title.setValue(event.title);
                this.ef.location.setValue(event.location);
                this.ef.start.setValue(moment.unix(event.start.seconds).format('DDMMYYYYhhmm'));
                this.ef.end.setValue(moment.unix(event.end.seconds).format('DDMMYYYYhhmm'));
                this.ef.description.setValue(event.description);
                this.modalRef = this.modalService.show(template);
            } else {
                console.log('Event does not exist');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    confirmDelete() {
        if (this.tempEventId) {
            this.db.collection('event').doc(this.tempEventId).delete().then(() => {
                console.log('Event #' + this.tempEventId + ' deleted.');
                this.tempEventId = null;
            }).catch(error => {
                console.log(error);
                this.tempEventId = null;

            });
        } else {
            console.log('No event ID to delete.');
        }

        this.modalRef.hide();
    }

    declineDelete() {
        this.modalRef.hide();
        this.tempEventId = null;
    }
}
