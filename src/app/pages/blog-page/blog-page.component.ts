import { Component } from '@angular/core';
import { BLOG_POSTS } from '../../data/site-data';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {
  posts = BLOG_POSTS;
}
