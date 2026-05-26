import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LegalPageComponent } from './pages/legal-page/legal-page.component';
import { MirrorPageComponent } from './pages/mirror-page/mirror-page.component';
import { TechnologyPageComponent } from './pages/technology-page/technology-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'technology', component: TechnologyPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'post/:slug', component: MirrorPageComponent, data: { shell: false } },
  {
    path: 'privacy-policy',
    component: LegalPageComponent,
    data: {
      legalKey: 'warranty'
    }
  },
  {
    path: 'privacy-policy-1',
    component: LegalPageComponent,
    data: {
      legalKey: 'iq-world'
    }
  },
  {
    path: 'terms-and-coniditions',
    component: LegalPageComponent,
    data: {
      legalKey: 'technical'
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
