/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MedicalHistoriesComponent } from './medical-histories.component';
import { MedicalHistoriesListComponent } from './medical-histories-list/medical-histories-list.component';
import { MedicalHistoriesDetailComponent } from './medical-histories-detail/medical-histories-detail.component';

const routes: Routes = [
  {
    path: "",
    component: MedicalHistoriesComponent,
    children: [
      {
        path: "list",
        component: MedicalHistoriesListComponent,
        data: {
          title: "Danh sách lịch sử"
        }
      },
      {
        path: "detail/:id",
        component: MedicalHistoriesDetailComponent,
        data: {
          title: "Chi tiết cuộc hẹn"
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
export class MedicalHistoriesRoutingModule {}
