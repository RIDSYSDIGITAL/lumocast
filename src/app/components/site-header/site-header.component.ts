import { Component, HostListener, Input } from '@angular/core';
import { NavLink } from '../../models/site-content';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {
  @Input() links: NavLink[] = [];
  @Input() appLink = '';
  @Input() logoSrc = '';

  hidden = false;
  menuOpen = false;
  scrolled = false;
  private lastScrollY = 0;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScrollY = window.scrollY || 0;
    this.scrolled = currentScrollY > 24;

    if (currentScrollY <= 24) {
      this.hidden = false;
      this.scrolled = false;
      this.lastScrollY = 0;
      return;
    }

    this.hidden = currentScrollY > this.lastScrollY && currentScrollY > 120;
    this.lastScrollY = currentScrollY;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 860) {
      this.menuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
