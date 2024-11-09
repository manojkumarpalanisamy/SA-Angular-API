import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  onNewContact(): void {
    this.router.navigate(['/contact-form']);
  }

  onEditContact(contact: Contact): void {
    this.router.navigate(['/contact-form'], { queryParams: { id: contact.id } });
  }

  onDeleteContact(id: number): void {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts();
      });
    }
  }
}

