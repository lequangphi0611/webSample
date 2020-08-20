/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentsFormComponent } from "./appointments-form/appointments-form.component";
import { AppointmentsListComponent } from "./appointments-list/appointments-list.component";
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentsInfoComponent } from "./appointments-info/appointments-info.component";
import { AppointmentsWaitComponent } from "./appointments-wait/appointments-wait.component";
import { AppointmentsCancelComponent } from "./appointments-cancel/appointments-cancel.component";
import { AppointmentsFinishedComponent } from './appointments-finished/appointments-finished.component';
import { AppointmentsFinishedInfoComponent } from './appointments-finished-info/appointments-finished-info.component';
import { AppointmentsFinishUpdateComponent } from './appointments-finish-update/appointments-finish-update.component';
import { HomeAssignComponent } from './home-assign/home-assign.component';

const routes: Routes = [
  {
    path: "",
    component: AppointmentsComponent,
    data: {
      title: "Cuộc hẹn"
    },
    children: [
      {
        path: "list",
        component: AppointmentsListComponent,
        data: {
          title: "Danh sách cuộc hẹn"
        }
      },
      {
        path: "add",
        component: AppointmentsFormComponent,
        data: {
          title: "Tạo cuộc hẹn"
        }
      },
      {
        path: "cancel",
        component: AppointmentsCancelComponent,
        data: {
          title: "Cuộc hẹn bị hủy"
        }
      },
      {
        path: "finished",
        component: AppointmentsFinishedComponent,
        data: {
          title: "Cuộc hẹn đã kết thúc"
        }
      },
      {
        path: "finished/info/:id",
        component: AppointmentsFinishedInfoComponent,
        data: {
          title: "Cuộc hẹn đã kết thúc"
        }
      },
      {
        path: "finished/update/:id/:appId",
        component: AppointmentsFinishUpdateComponent,
        data: {
          title: "Thêm thông tin khám"
        }
      },
      {
        path: "waiting",
        component: AppointmentsWaitComponent,
        data: {
          title: "Cuộc hẹn đang đợi xử lý"
        }
      },
      {
        path: "info/:id",
        component: AppointmentsInfoComponent,
        data: {
          title: "Thông tin cuộc hẹn"
        }
      },
      {
        path: "edit/:id",
        component: AppointmentsFormComponent,
        data: {
          title: "Chỉnh sửa cuộc hẹn"
        }
      },
      {
        path: "assign/:id",
        component: HomeAssignComponent,
        data: {
          title: "Cập nhật bác sĩ"
        }
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {}
