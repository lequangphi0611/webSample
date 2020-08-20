/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-root"
 * @param {any} template:`<router-outlet></router-outlet>`}
 * @returns {any}
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { AuthenticationService } from "./core/authentication/authentication.service";
import { Router } from "@angular/router";
import { ROLE } from "./shared/config";
import { AccountService } from "./core/domain/services/account.service";
import { User } from "./core/domain/model/user";

@Component({
  selector: "app-redirection",
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppRoutingRedirectionComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService: AuthenticationService
  ) {}

  /**
   * @description
   * @memberof AppComponent
   */
  ngOnInit() {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      const currentRole = this.filterRole(res);

      if (currentRole === ROLE.ADMIN) {
        this.router.navigate(["management"]);
      } else if (currentRole === ROLE.DOCTOR) {
        this.router.navigate(["management/profile"]);
      } else if (currentRole === ROLE.NURSE) {
        this.router.navigate(["management"]);
      } else if (currentRole === ROLE.PATIENT) {
        this.router.navigate(["management/profile"]);
      }
    });
  }

  /**
   * @description
   * @memberof AppComponent
   */
  ngOnDestroy() {}

  private filterRole(user: User) {
    if (user) {
      if (user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
        return ROLE.ADMIN;
      } else if (user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
        return ROLE.DOCTOR;
      } else if (user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
        return ROLE.NURSE;
      } else if (user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
        return ROLE.PATIENT;
      }
    } else {
      this.authService.logout();
      this.router.navigate(["management"]);
    }
  }
}
