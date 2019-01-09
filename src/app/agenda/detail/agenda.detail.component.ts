import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import 'moment/locale/nl-be';

@Component({
  templateUrl: './agenda.detail.component.html',
  providers: []
})
export class AgendaDetailComponent implements OnInit {
  event: any;
  loading = true;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.db.collection('event').doc(params['id']).ref.get().then(doc => {
        if (doc.exists) {
          this.event = doc.data();
        }
      });
    });
  }

  convertSecondsToDate(seconds: number): String {
    return moment.unix(seconds).format('MM/DD/YYYY HH:mm');
  }
}
