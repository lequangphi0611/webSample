/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[DepartmentsDialogComponent
 * @param {any} DepartmentsListComponent
 * @param {any} DepartmentsComponent]
 * @param {any} imports:[CommonModule
 * @param {any} DepartmentsRoutingModule
 * @param {any} SharedModule]
 * @param {any} entryComponents:[DepartmentsDialogComponent]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { DepartmentsDialogComponent } from "./departments-dialog/departments-dialog.component";
import { DepartmentsListComponent } from "./departments-list/departments-list.component";
import { DepartmentsRoutingModule } from "./departments-routing.module";
import { DepartmentsComponent } from "./departments.component";

@NgModule({
  declarations: [
    DepartmentsDialogComponent,
    DepartmentsListComponent,
    DepartmentsComponent
  ],
  imports: [CommonModule, DepartmentsRoutingModule, SharedModule],
  entryComponents: [DepartmentsDialogComponent]
})
export class DepartmentsModule {}
