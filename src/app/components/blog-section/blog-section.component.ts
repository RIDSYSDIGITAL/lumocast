import { Component, Input } from '@angular/core';
import { BlogPost } from '../../models/site-content';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss']
})
export class BlogSectionComponent {
  @Input() posts: BlogPost[] = [];
  @Input() pageMode = false;

  get homepagePosts(): BlogPost[] {
    return this.posts.slice(0, 3);
  }

  get pageTitle(): string {
    return this.pageMode
      ? 'All Posts'
      : 'Blog is Must For Our Readers, Trend keepers.';
  }

  get pageCopy(): string {
    return 'LUMOCAST Blog for engaging with readers through latest updates, events, product launches and media announcements.';
  }

  formatIndex(index: number): string {
    return index.toString().padStart(2, '0');
  }

  trackByPost(_: number, post: BlogPost): string {
    // return post.href || post.title;
    return post.title;
  }
}
