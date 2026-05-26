import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newsletter-section',
  templateUrl: './newsletter-section.component.html',
  styleUrls: ['./newsletter-section.component.scss']
})
export class NewsletterSectionComponent {
  email = '';
  submitted = false;

  submit(form: NgForm): void {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    this.email = '';
    form.resetForm();
    this.submitted = false;
  }
}
