/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[NursesComponent
 * @param {any} NursesListComponent
 * @param {any} NursesDialogFormComponent
 * @param {any} NursesDialogProfileComponent]
 * @param {any} imports:[CommonModule
 * @param {any} NursesRoutingModule
 * @param {any} SharedModule]
 * @param {any} entryComponents:[NursesDialogFormComponent
 * @param {any} NursesDialogProfileComponent]}
 * @returns {any}
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NursesComponent } from './nurses.component';
import { NursesListComponent } from './nurses-list/nurses-list.component';
import { NursesDialogFormComponent } from './nurses-dialog-form/nurses-dialog-form.component';
import { NursesDialogProfileComponent } from './nurses-dialog-profile/nurses-dialog-profile.component';
import { NursesRoutingModule } from './nurses-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NursesComponent, NursesListComponent,
    NursesDialogFormComponent,
    NursesDialogProfileComponent],
  imports: [CommonModule, NursesRoutingModule, SharedModule],
  entryComponents: [NursesDialogFormComponent, NursesDialogProfileComponent]
})
export class NursesModule { }
