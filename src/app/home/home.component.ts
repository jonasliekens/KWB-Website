import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    templateUrl: './home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    nextEvent: any;
    latestPost: any;

    constructor(private homeService: HomeService, private db: AngularFirestore) {
    }

    ngOnInit(): void {
        this.getNextEvent();
        this.getLatestPost();
    }

    private getNextEvent() {
        this.db.collection('/event').ref
            .where('start', '>=', new Date())
            .orderBy('start', 'asc')
            .limit(1)
            .get().then(doc => {
            if (!doc.empty) {
                let id = doc.docs[0].id;
                let data = doc.docs[0].data();
                this.nextEvent = {id, ...data};
            } else {
                this.nextEvent = null;
            }
        });
    }

    private getLatestPost() {
        this.db.collection('/post').ref
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get().then(doc => {
            if (!doc.empty) {
                let id = doc.docs[0].id;
                let data = doc.docs[0].data();
                this.latestPost = {id, ...data};
            } else {
                this.latestPost = null;
            }
        });
    }
}
