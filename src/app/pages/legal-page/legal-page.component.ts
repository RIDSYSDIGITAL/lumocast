import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LEGAL_PAGE_CONTENT } from '../../data/site-data';
import { LegalPageContent } from '../../models/site-content';

@Component({
  selector: 'app-legal-page',
  templateUrl: './legal-page.component.html',
  styleUrls: ['./legal-page.component.scss']
})
export class LegalPageComponent {
  content: LegalPageContent;

  constructor(private readonly route: ActivatedRoute) {
    const legalKey = this.route.snapshot.data['legalKey'] as string | undefined;
    this.content = LEGAL_PAGE_CONTENT[legalKey ?? 'warranty'] ?? LEGAL_PAGE_CONTENT['warranty'];
  }
}
