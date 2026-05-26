import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CONTACT } from '../../data/site-data';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  contact = CONTACT;
  submitted = false;
  mailClientOpened = false;
  readonly distributors = [
    {
      name: 'Sorab Enterprise Sdn Bhd, Malaysia',
      image:
        'https://static.wixstatic.com/media/157f6f_aa0d44e9db214beca29592e69fea1dc0~mv2.png/v1/fill/w_900,h_600,al_c,q_85,enc_avif,quality_auto/CANCANMalasiaDistributor.png'
    },
    {
      name: 'Sorab Enterprise Pte Ltd, Singapore',
      image:
        'https://static.wixstatic.com/media/157f6f_8bc21ac191ca4c80841b8442c111c106~mv2.png/v1/fill/w_900,h_600,al_c,q_85,enc_avif,quality_auto/CANSingaporeDistributor.png'
    }
  ];
  readonly inquiryTypes = [
    'General Inquiry',
    'Product Demo',
    'Distributor Partnership',
    'Technical Support'
  ];
  readonly canModels = [
    'LUMOCAST',
    'LUMOCASTLit',
    'LUMOCASTVue',
    'LUMOCASTWid',
    'LUMOCASTMount',
    'LUMOCASTNX',
    'LUMOCASTDesk',
    'LUMOCASTDeskTent',
    'LUMOCASTDeskWid',
    'LUMOCASTDeskTab',
    'LUMOCASTDeskMount'
  ];

  readonly contactForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    companyName: [''],
    designation: [''],
    phone: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
    inquiryType: ['', [Validators.required]],
    canModel: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  submit(): void {
    this.submitted = true;
    this.mailClientOpened = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.getRawValue();
    const subject = `${formValue.inquiryType} | ${formValue.canModel} | ${formValue.firstName} ${formValue.lastName}`;
    const bodyLines = [
      'Hello LUMOCAST Signage Team,',
      '',
      'Please find my inquiry details below:',
      '',
      `First Name: ${formValue.firstName}`,
      `Last Name: ${formValue.lastName}`,
      `Email: ${formValue.email}`,
      `Phone: ${formValue.phone}`,
      `Company Name: ${formValue.companyName || 'N/A'}`,
      `Designation: ${formValue.designation || 'N/A'}`,
      `Inquiry Type: ${formValue.inquiryType}`,
      `LUMOCAST Model: ${formValue.canModel}`,
      '',
      'Message:',
      formValue.message,
      '',
      'Regards,',
      `${formValue.firstName} ${formValue.lastName}`
    ];
    const mailtoUrl =
      `mailto:${this.contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailtoUrl;
    this.mailClientOpened = true;
    this.contactForm.reset();
    this.submitted = false;
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/\D/g, '').slice(0, 15);

    if (sanitizedValue !== input.value) {
      input.value = sanitizedValue;
    }

    this.phone.setValue(sanitizedValue, { emitEvent: false });
  }

  get name() {
    return this.contactForm.controls.firstName;
  }

  get lastName() {
    return this.contactForm.controls.lastName;
  }

  get email() {
    return this.contactForm.controls.email;
  }

  get phone() {
    return this.contactForm.controls.phone;
  }

  get inquiryType() {
    return this.contactForm.controls.inquiryType;
  }

  get canModel() {
    return this.contactForm.controls.canModel;
  }

  get message() {
    return this.contactForm.controls.message;
  }
}
