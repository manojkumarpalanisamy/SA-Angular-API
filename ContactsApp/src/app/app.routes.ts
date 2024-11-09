import { Routes } from "@angular/router";
import { ContactsComponent } from "./contacts/contacts.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

export const routes: Routes = [
    { path: 'contact', component: ContactsComponent },
    {path : 'contact-form', component: ContactFormComponent },
    { path: '', redirectTo: '/contact', pathMatch: 'full' },  // Optional: Redirect to home if no route is specified
    { path: '**', redirectTo: '/contact' }  // Catch-all route, can be used to redirect to a default route
  ];
  