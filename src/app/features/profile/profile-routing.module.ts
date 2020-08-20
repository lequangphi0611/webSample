/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[RouterModule.forChild(routes
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    data: {
      title: 'Trang cá nhân'
    }
  },
  {
    path: "editProfile",
    component: ProfileEditComponent,
    data: {
      title: 'Chỉnh sửa thông tin'
    }
  },
  {
    path: "**",
    redirectTo: "profile",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class ProfileRoutingModule {}
