import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { initSiteInteractions } from './shared/site-interactions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private cleanup?: () => void;
  private readonly subscriptions = new Subscription();

  constructor(private readonly router: Router, private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.cleanup = initSiteInteractions(document);
      this.subscriptions.add(
        this.router.events
          .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
          .subscribe(() => {
            window.setTimeout(() => {
              this.cleanup?.();
              this.cleanup = initSiteInteractions(document);
            });
          })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.cleanup?.();
  }
}
