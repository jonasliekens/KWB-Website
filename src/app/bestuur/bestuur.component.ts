import {Component, OnInit} from '@angular/core';
import {UserService} from './bestuur.service';

@Component({
  templateUrl: './bestuur.component.html',
  providers: [UserService]
})
export class BestuurComponent implements OnInit{
  users: any;
  loading = true;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      err => console.log(err),
      () => this.loading = false);
  }
}
