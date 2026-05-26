import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
import { InteractiveMotionDirective } from './directives/interactive-motion.directive';
import { RevealOnScrollDirective } from './directives/reveal-on-scroll.directive';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LegalPageComponent } from './pages/legal-page/legal-page.component';
import { MirrorPageComponent } from './pages/mirror-page/mirror-page.component';
import { TechnologyPageComponent } from './pages/technology-page/technology-page.component';

@NgModule({
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
    InteractiveMotionDirective,
    RevealOnScrollDirective,
    HomePageComponent,
    TechnologyPageComponent,
    BlogPageComponent,
    ContactPageComponent,
    MirrorPageComponent,
    LegalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
