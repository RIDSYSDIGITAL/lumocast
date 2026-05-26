import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mirror-page',
  templateUrl: './mirror-page.component.html',
  styleUrls: ['./mirror-page.component.scss']
})
export class MirrorPageComponent implements OnInit {
  errorMessage = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    void this.loadMirrorPage();
  }

  private async loadMirrorPage(): Promise<void> {
    const mirrorPath = this.toMirrorPath(this.router.url);

    try {
      const response = await fetch(`/${mirrorPath}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Unable to load ${mirrorPath}`);
      }

      const html = await response.text();
      document.open();
      document.write(html);
      document.close();
    } catch (error) {
      console.error(error);
      this.errorMessage =
        'The mirrored LUMOCAST Signage page could not be loaded. Please restart the dev server and refresh again.';
    }
  }

  private toMirrorPath(routeUrl: string): string {
    const cleanUrl = routeUrl.split('?')[0].split('#')[0];

    if (cleanUrl === '/' || cleanUrl === '') {
      return 'mirror/index.html';
    }

    if (cleanUrl === '/technology') {
      return 'mirror/technology.html';
    }

    if (cleanUrl === '/blog') {
      return 'mirror/blog.html';
    }

    if (cleanUrl === '/contact') {
      return 'mirror/contact.html';
    }

    if (cleanUrl === '/privacy-policy') {
      return 'mirror/privacy-policy.html';
    }

    if (cleanUrl === '/privacy-policy-1') {
      return 'mirror/privacy-policy-1.html';
    }

    if (cleanUrl === '/terms-and-coniditions') {
      return 'mirror/terms-and-coniditions.html';
    }

    if (cleanUrl.startsWith('/post/')) {
      return `mirror${cleanUrl}.html`;
    }

    return 'mirror/index.html';
  }
}
