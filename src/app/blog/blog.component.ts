import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/nl-be';
import {map} from 'rxjs/operators';

@Component({
    templateUrl: './blog.component.html',
    providers: []
})
export class BlogComponent {
    posts: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        this.posts = this.db.collection('/post').snapshotChanges().pipe(
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
        return moment.unix(seconds).calendar();
    }
}
