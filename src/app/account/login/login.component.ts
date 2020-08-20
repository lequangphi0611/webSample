/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @param {any} {selector:"app-login"
 * @param {any} templateUrl:"./login.component.html"
 * @param {any} styleUrls:["./login.component.scss"]}
 * @returns {any}
 */
import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  LoginContext
} from "./../../core/authentication/authentication.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ROLE } from "app/shared/config";
import { User } from "app/core/domain/model/user";
import { AccountService } from "app/core/domain/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginContext: LoginContext = null;
  public loginForm: FormGroup;

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @param {any} privatefb:FormBuilder
   * @param {any} privaterouter:Router
   * @param {any} privateauthService:AuthenticationService
   * @param {any} privatesnackBar:MatSnackBar
   * @returns {any}
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  ngOnInit() {
    this.buildForm();
  }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  buildForm() {
    this.loginForm = this.fb.group({
      phone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rememberMe: [false]
    });
  }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  onClick = () => {
    this.loginContext = {
      phone: this.loginForm.value.phone,
      password: this.loginForm.value.password
    };

    this.authService.login(this.loginContext).subscribe(
      e => {
        // this.router.navigate(["management"]);

        this.accountService.getCurrentUserLogged().subscribe(res => {
          const currentRole = this.filterRole(res);

          if (currentRole === ROLE.ADMIN) {
            this.router.navigate(["management"]);
          } else if (currentRole === ROLE.DOCTOR) {
            // this.router.navigate(["management/task/list"]);
            this.router.navigate(["management/profile"]);
          } else if (currentRole === ROLE.NURSE) {
            this.router.navigate(["management"]);
          } else if (currentRole === ROLE.PATIENT) {
            // this.router.navigate(["management/task/list"]);
            this.router.navigate(["management/profile"]);
          }
        });

        this.openSnackBar("Đăng nhập thành công", this.loginForm.value.phone);
      },
      error =>
        this.openSnackBar(
          "Sai tài khoản hoặc mật khẩu, xin nhập lại",
          this.loginForm.value.phone
        )
    );
  };

  private filterRole(user: User) {
    if (user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
      return ROLE.ADMIN;
    } else if (user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
      return ROLE.DOCTOR;
    } else if (user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
      return ROLE.NURSE;
    } else if (user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
      return ROLE.PATIENT;
    }
  }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @param {any} message:string
   * @param {any} action:string
   * @returns {any}
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
