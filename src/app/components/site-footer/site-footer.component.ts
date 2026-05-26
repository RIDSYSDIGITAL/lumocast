import { Component, Input } from '@angular/core';
import { FooterContact, NavLink } from '../../models/site-content';
import { SITE_LOGO } from '../../data/site-data';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  readonly logoSrc = SITE_LOGO;

  @Input() navLinks: NavLink[] = [];
  @Input() legalLinks: NavLink[] = [];
  @Input() socialLinks: NavLink[] = [];
  @Input() contact: FooterContact = {
    email: '',
    phone: '',
    address: '',
    copyright: ''
  };
}
