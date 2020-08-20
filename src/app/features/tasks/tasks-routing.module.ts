import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: "",
    component: TasksComponent,
    children: [
      {
        path: "list",
        component: TasksListComponent,
        data: {
          title: "Danh sách công việc"
        }
      }
    ]
  },
  {
    path: "**",
    redirectTo: "list",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
