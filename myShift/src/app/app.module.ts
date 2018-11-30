import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoworkersComponent } from './coworkers/coworkers.component';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component'
import { DialogOverviewExampleDialog } from './calendar/calendar.component';

import { MatDialog,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AvailabilityComponent } from './availability/availability.component';
import { Availability } from './calendar/calendar.component';

//import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CoworkersComponent,
    NavigationComponent,
    LeftMenuComponent,
    DialogOverviewExampleDialog,
    CalendarComponent,
    DialogBoxComponent,
    AvailabilityComponent,
    Availability
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    AvailabilityComponent,
    Availability
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    BsDatepickerModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
