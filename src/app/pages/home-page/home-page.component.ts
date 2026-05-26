import { Component } from '@angular/core';
import {
  ABOUT_IMAGE,
  BLOG_POSTS,
  DISPLAY_IMAGE,
  DISPLAY_STATS,
  HERO_BACKGROUND,
  HERO_SHOWCASE,
  IQ_WORLD_IMAGE,
  IQ_WORLD_LINK,
  PRODUCTS
} from '../../data/site-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  heroBackground = HERO_BACKGROUND;
  heroShowcase = HERO_SHOWCASE;
  aboutImage = ABOUT_IMAGE;
  displayImage = DISPLAY_IMAGE;
  iqWorldImage = IQ_WORLD_IMAGE;
  iqWorldLink = IQ_WORLD_LINK;
  displayStats = DISPLAY_STATS;
  products = PRODUCTS;
  blogPosts = BLOG_POSTS;
}
