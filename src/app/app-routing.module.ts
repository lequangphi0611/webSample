/**
 * 描述
 * @date 2019-12-01
 * @returns {any}
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { FeaturesComponent } from "./features/features.component";
import { FEATURES_ROUTES } from "./features/features.routes";
import { AppRoutingRedirectionComponent } from './app-routing-redirect.component';

const appRoutes: Routes = [
  {
    path: "",
    component: AppRoutingRedirectionComponent,
    pathMatch: "full"
  },
  {
    path: "management",
    component: FeaturesComponent,
    children: FEATURES_ROUTES,
    canActivateChild: [ProtectedGuard]
  },
  {
    path: "auth",
    loadChildren: './account/account.module#AccountModule',
    canActivateChild: [PublicGuard]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}