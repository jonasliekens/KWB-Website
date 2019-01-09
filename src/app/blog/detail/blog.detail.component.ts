import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import 'moment/locale/nl-be';

@Component({
    templateUrl: './blog.detail.component.html',
    providers: []
})
export class BlogDetailComponent implements OnInit, OnDestroy {
    post: any;
    private sub: any;

    constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.getPost(params['id']);
        });
    }

    getPost(id: string) {
        this.db.collection('/post').doc(id).ref.get().then(doc => {
            if (doc.exists) {
                this.post = doc.data();
            }
        });
    }

    convertSecondsToDate(seconds: number): String {
        return moment.unix(seconds).calendar();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
