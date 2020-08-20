/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[DoctorsComponent
 * @param {any} DoctorsListComponent
 * @param {any} DoctorsDialogFormComponent
 * @param {any} DoctorsDialogProfileComponent]
 * @param {any} imports:[CommonModule
 * @param {any} DoctorsRoutingModule
 * @param {any} SharedModule]
 * @param {any} entryComponents:[DoctorsDialogFormComponent
 * @param {any} DoctorsDialogProfileComponent]
 * @param {any} providers:[UploadFirebaseService]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { DoctorsDialogFormComponent } from "./doctors-dialog-form/doctors-dialog-form.component";
import { DoctorsDialogProfileComponent } from "./doctors-dialog-profile/doctors-dialog-profile.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";
import { DoctorsRoutingModule } from "./doctors-routing.module";
import { DoctorsComponent } from "./doctors.component";
import { UploadFirebaseService } from 'app/core/domain/services/uploadFirebaseService';

@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorsListComponent,
    DoctorsDialogFormComponent,
    DoctorsDialogProfileComponent
  ],
  imports: [CommonModule, DoctorsRoutingModule, SharedModule],
  entryComponents: [DoctorsDialogFormComponent, DoctorsDialogProfileComponent],
  providers: [
    UploadFirebaseService
  ]
})
export class DoctorsModule {}
