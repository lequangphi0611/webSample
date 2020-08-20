/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PatientsListComponent } from "./patients-list/patients-list.component";
import { PatientsComponent } from "./patients.component";
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';
import { NgxPermissionsRouterData, NgxPermissionsGuard } from 'ngx-permissions';
import { ROLE } from 'app/shared/config';

const routes: Routes = [
  {
    path: "",
    component: PatientsComponent,
    children: [
      {
        path: "list",
        component: PatientsListComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ROLE.ADMIN, ROLE.NURSE]
          } as NgxPermissionsRouterData,
          title: "Danh sách bệnh nhân"
        }
      },
      {
        path: "profile/:id",
        component: PatientsProfileComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: []
          } as NgxPermissionsRouterData,
          title: "Thông tin bệnh nhân"
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
export class PatientsRoutingModule {}
