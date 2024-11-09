import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode: boolean = false;
  contactId?: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.contactId = +params['id'];
        this.contactService.getContact(this.contactId).subscribe((contact: Contact) => {
          this.contactForm.patchValue(contact);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value as Contact;
      if (this.isEditMode && this.contactId !== undefined) {
        contact.id = this.contactId;
        this.contactService.updateContact(this.contactId, contact).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      } else {
        this.contactService.createContact(contact).subscribe(() => {
          this.router.navigate(['/contacts']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
