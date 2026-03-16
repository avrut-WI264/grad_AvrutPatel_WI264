import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { StudentListComponent } from './components/student-list/student-list';
import { StudentFormComponent } from './components/student-form/student-form';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App,
     StudentListComponent,
      StudentFormComponent
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     ReactiveFormsModule,
     FormsModule],
  providers: [provideBrowserGlobalErrorListeners(),provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
