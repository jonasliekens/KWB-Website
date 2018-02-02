import {Component, OnInit} from '@angular/core';
import {AgendaService} from './agenda.service';

@Component({
  templateUrl: './agenda.component.html',
  providers: [AgendaService]
})
export class AgendaComponent implements OnInit {
  agendaPage: any;
  loading = true;
  currentPage = 1;

  constructor(private agendaService: AgendaService) {
    this.getEvents();
  }

  setPage(pageNr): void {
    if ( pageNr != null ) {
      this.currentPage = pageNr;
      this.getEvents();
    }
  }

  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents() {
    this.agendaService.getEvents(this.currentPage).subscribe(
      page => this.agendaPage = page,
      err => console.log(err),
      () => this.loading = false);
  }
}
