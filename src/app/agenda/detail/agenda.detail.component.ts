import {Component, OnDestroy, OnInit} from '@angular/core';
import {AgendaDetailService} from './agenda.detail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './agenda.detail.component.html',
  providers: [AgendaDetailService]
})
export class AgendaDetailComponent implements OnInit, OnDestroy {
  event: any;
  loading = true;
  private sub: any;

  constructor(private agendaDetailService: AgendaDetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.getEvent(+params['id']); // (+) converts string 'id' to a number
    });
  }

  private getEvent(id) {
    this.agendaDetailService.getEvent(id).subscribe(
      event => this.event = event,
      err => console.log(err),
      () => this.loading = false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
