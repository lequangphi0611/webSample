/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NursesComponent } from './nurses.component';
import { NursesListComponent } from './nurses-list/nurses-list.component';

const routes: Routes = [
  {
    path: "",
    component: NursesComponent,
    children: [
      {
        path: "list",
        component: NursesListComponent,
        data: {
          title: 'Danh sách y tá'
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
export class NursesRoutingModule {}
