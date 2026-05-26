import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { BlogSectionComponent } from './components/blog-section/blog-section.component';
import { ControlCenterSectionComponent } from './components/control-center-section/control-center-section.component';
import { DisplaySectionComponent } from './components/display-section/display-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { NewsletterSectionComponent } from './components/newsletter-section/newsletter-section.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { RevealOnScrollDirective } from './directives/reveal-on-scroll.directive';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TechnologyPageComponent } from './pages/technology-page/technology-page.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
    declarations: [
      AppComponent,
      SiteHeaderComponent,
      HeroSectionComponent,
      AboutSectionComponent,
      DisplaySectionComponent,
      ControlCenterSectionComponent,
      ProductsSectionComponent,
      BlogSectionComponent,
      NewsletterSectionComponent,
      SiteFooterComponent,
      RevealOnScrollDirective,
      HomePageComponent,
      TechnologyPageComponent,
      BlogPageComponent,
      ContactPageComponent
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cansignage'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cansignage');
  });

  it('should render the app shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
