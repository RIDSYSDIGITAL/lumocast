import {
  AfterViewInit,
  Component,
  HostListener,
  Input
} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements AfterViewInit {
  @Input() backgroundImage = '';
  @Input() showcaseImage = '';

  heroScrollOffset = 0;
  private reducedMotion = false;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.syncScrollOffset();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncScrollOffset();
  }

  private syncScrollOffset(): void {
    if (typeof window === 'undefined' || this.reducedMotion) {
      this.heroScrollOffset = 0;
      return;
    }

    this.heroScrollOffset = Math.min(window.scrollY, 420);
  }
}
