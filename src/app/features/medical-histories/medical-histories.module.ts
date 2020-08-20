/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[MedicalHistoriesListComponent
 * @param {any} MedicalHistoriesComponent
 * @param {any} MedicalHistoriesDialogComponent]
 * @param {any} imports:[CommonModule
 * @param {any} MedicalHistoriesRoutingModule
 * @param {any} SharedModule]
 * @param {any} entryComponents:[MedicalHistoriesDialogComponent]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { MedicalHistoriesDialogComponent } from "./medical-histories-dialog/medical-histories-dialog.component";
import { MedicalHistoriesListComponent } from "./medical-histories-list/medical-histories-list.component";
import { MedicalHistoriesRoutingModule } from "./medical-histories-routing.module";
import { MedicalHistoriesComponent } from "./medical-histories.component";
import { MedicalHistoriesDetailComponent } from './medical-histories-detail/medical-histories-detail.component';

@NgModule({
  declarations: [
    MedicalHistoriesListComponent,
    MedicalHistoriesComponent,
    MedicalHistoriesDialogComponent,
    MedicalHistoriesDetailComponent
  ],
  imports: [CommonModule, MedicalHistoriesRoutingModule, SharedModule],
  entryComponents: [MedicalHistoriesDialogComponent]
})
export class MedicalHistoriesModule {}
