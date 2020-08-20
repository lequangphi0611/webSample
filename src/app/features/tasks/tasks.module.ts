import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksDialogComponent } from "./tasks-dialog/tasks-dialog.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TasksComponent } from "./tasks.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [TasksDialogComponent, TasksListComponent, TasksComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
  entryComponents: [TasksDialogComponent]
})
export class TasksModule {}
