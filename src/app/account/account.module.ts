/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @param {any} {declarations:[AccountComponent
 * @param {any} LoginComponent
 * @param {any} RegisterComponent
 * @param {any} ForgotComponent]
 * @param {any} imports:[CommonModule
 * @param {any} AccountRoutingModule
 * @param {any} FormsModule
 * @param {any} ReactiveFormsModule
 * @param {any} SharedModule]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from "./account-routing.module";
import { AccountComponent } from "./account.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule {}
