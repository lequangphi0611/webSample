/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[PatientsComponent
 * @param {any} PatientsListComponent
 * @param {any} PatientsDialogFormComponent
 * @param {any} PatientsProfileComponent]
 * @param {any} imports:[CommonModule
 * @param {any} PatientsRoutingModule
 * @param {any} SharedModule]
 * @param {any} entryComponents:[PatientsDialogFormComponent]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { PatientsDialogFormComponent } from "./patients-dialog-form/patients-dialog-form.component";
import { PatientsListComponent } from "./patients-list/patients-list.component";
import { PatientsRoutingModule } from "./patients-routing.module";
import { PatientsComponent } from "./patients.component";
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientsListComponent,
    PatientsDialogFormComponent,
    PatientsProfileComponent
  ],
  imports: [CommonModule, PatientsRoutingModule, SharedModule],
  entryComponents: [PatientsDialogFormComponent]
})
export class PatientsModule {}
