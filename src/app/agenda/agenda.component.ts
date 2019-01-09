import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/nl-be';

@Component({
  templateUrl: './agenda.component.html',
  providers: []
})
export class AgendaComponent {
  events: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.events = this.db.collection('event').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
    );
  }

  convertSecondsToDate(seconds: number): String {
    return moment.unix(seconds).format('MM/DD/YYYY');
  }
}
