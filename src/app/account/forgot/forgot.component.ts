/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @param {any} {selector:'app-forgot'
 * @param {any} templateUrl:'./forgot.component.html'
 * @param {any} styleUrls:['./forgot.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/domain/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

const EMAIL_VALIDATOR = [Validators.required, Validators.email];

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  emailControl = new FormControl('', EMAIL_VALIDATOR);

  errorMessage: string;

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  ngOnInit() {
  }

  onSubmit() {
    this.userService
      .recoverPassword(this.emailControl.value)
      .subscribe(() => this.onSuccess(), (err) => this.onError(err));
  }

  onSuccess() {
    this.openSnackBar("Đã gửi mật khẩu đến địa chỉ Email", this.emailControl.value);
  }

  onError(err) {
    this.errorMessage = err.error.message;
    this.emailControl.setErrors({
      emailNotfound: true
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

}
