import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  CONTACT,
  IQ_WORLD_LINK,
  LEGAL_LINKS,
  NAV_LINKS,
  SITE_LOGO,
  SITE_TITLE,
  SOCIAL_LINKS
} from './data/site-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = SITE_TITLE;
  navLinks = NAV_LINKS;
  logoSrc = SITE_LOGO;
  appLink = IQ_WORLD_LINK;
  legalLinks = LEGAL_LINKS;
  socialLinks = SOCIAL_LINKS;
  contact = CONTACT;
  showShell = true;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showShell = this.resolveShellVisibility();
      });

    this.showShell = this.resolveShellVisibility();
  }

  private resolveShellVisibility(): boolean {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data['shell'] !== false;
  }
}
