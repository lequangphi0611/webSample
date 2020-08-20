/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";
import { DoctorsComponent } from "./doctors.component";
import { DoctorsDialogProfileComponent } from './doctors-dialog-profile/doctors-dialog-profile.component';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';
import { ROLE } from 'app/shared/config';

const routes: Routes = [
  {
    path: "",
    component: DoctorsComponent,
    children: [
      {
        path: "list",
        component: DoctorsListComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ROLE.ADMIN, ROLE.NURSE]
          } as NgxPermissionsRouterData,
          title: 'Danh sách bác sĩ'
        }
      },
      {
        path: "profile/:id",
        component: DoctorsDialogProfileComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          title: 'Thông tin bác sĩ',
          permissions: {
            only: []
          } as NgxPermissionsRouterData,
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
export class DoctorsRoutingModule {}
