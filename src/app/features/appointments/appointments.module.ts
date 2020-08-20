import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { AppointmentsFormComponent } from "./appointments-form/appointments-form.component";
import { AppointmentsListComponent } from "./appointments-list/appointments-list.component";
import { AppointmentsRoutingModule } from "./appointments-routing.module";
import { AppointmentsComponent } from "./appointments.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { AppointmentsWaitComponent } from './appointments-wait/appointments-wait.component';
import { AppointmentsInfoComponent } from './appointments-info/appointments-info.component';
import { AppointmentsCancelComponent } from './appointments-cancel/appointments-cancel.component';
import { AppointmentsFinishedComponent } from './appointments-finished/appointments-finished.component';
import { AppointmentsFinishedInfoComponent } from './appointments-finished-info/appointments-finished-info.component';
import { AppointmentsFinishUpdateComponent } from './appointments-finish-update/appointments-finish-update.component';
import { FormsModule } from '@angular/forms';
import { HomeAssignComponent } from './home-assign/home-assign.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsFormComponent,
    AppointmentsListComponent,
    AppointmentsWaitComponent,
    AppointmentsInfoComponent,
    AppointmentsCancelComponent,
    AppointmentsFinishedComponent,
    AppointmentsFinishedInfoComponent,
    AppointmentsFinishUpdateComponent,
    HomeAssignComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ]
})
export class AppointmentsModule {}
