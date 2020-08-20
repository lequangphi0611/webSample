/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentsComponent } from "./departments.component";
import { DepartmentsListComponent } from "./departments-list/departments-list.component";
import { ROLE } from 'app/shared/config';
import { NgxPermissionsRouterData, NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: "",
    component: DepartmentsComponent,
    children: [
      {
        path: "list",
        component: DepartmentsListComponent,
        data: {
          title: "Danh sách khoa"
        }
      }
    ],
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLE.ADMIN]
      } as NgxPermissionsRouterData,
    }
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
export class DepartmentsRoutingModule {}
