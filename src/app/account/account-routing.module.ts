import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PublicGuard } from 'ngx-auth';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
        data: {
          title: 'Đăng nhập'
        }
      },
      {
        path: "register",
        component: RegisterComponent,
        data: {
          title: 'Đăng ký'
        }
      },
      {
        path: "forgot",
        component: ForgotComponent,
        data: {
          title: 'Quên mật khẩu'
        },
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
