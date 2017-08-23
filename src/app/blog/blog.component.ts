import {Component, OnInit} from '@angular/core';
import {BlogService} from './blog.service';

@Component({
  templateUrl: './blog.component.html',
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  blogPage: any;
  loading = true;
  currentPage = 1;

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  setPage(pageNr): void {
    if ( pageNr != null ) {
      this.currentPage = pageNr;
      this.getPosts();
    }
  }

  getPosts() {
    this.blogService.getPosts(this.currentPage).subscribe(
      page => this.blogPage = page,
      err => console.log(err),
      () => this.loading = false);
  }
}
