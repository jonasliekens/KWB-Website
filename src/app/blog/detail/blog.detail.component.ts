import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogDetailService} from './blog.detail.service';

@Component({
  templateUrl: './blog.detail.component.html',
  providers: [BlogDetailService]
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  post: any;
  loading = true;
  private sub: any;

  constructor(private blogDetailService: BlogDetailService,  private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.getPost(+params['id']); // (+) converts string 'id' to a number
    });
  }

  getPost(id) {
    this.blogDetailService.getPost(id).subscribe(
      post => this.post = post,
      err => console.log(err),
      () => this.loading = false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
