import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { AppRoutingModule } from "./app.routing.module";
import { RouterModule } from "@angular/router";
import { ContactService } from "./service/contact.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactFormComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule 
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
