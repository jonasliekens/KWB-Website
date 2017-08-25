import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';

@Component({
    templateUrl: './home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    nextEvent: any;
    latestPost: any;
    eventLoading = true;
    postLoading = true;


    constructor(private homeService: HomeService) {
    }

    ngOnInit(): void {
        this.getNextEvent();
        this.getLatestPost();
    }

    private getNextEvent() {
        this.homeService.getNextEvent().subscribe(
            nextEvent => this.nextEvent = nextEvent,
            err => console.log(err),
            () => this.eventLoading = false
        );
    }

    private getLatestPost() {
        this.homeService.getLatestPosts().subscribe(
            latestPost => this.latestPost = latestPost,
            err => console.log(err),
            () => this.postLoading = false
        );
    }
}
