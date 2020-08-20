/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-profile"
 * @param {any} templateUrl:"./profile.component.html"
 * @param {any} styleUrls:["./profile.component.scss"]}
 * @returns {any}
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "app/core/authentication/authentication.service";
import { Profile } from "app/core/domain/model/profile";
import { AccountService } from "app/core/domain/services/account.service";
import { UserService } from "app/core/domain/services/user.service";
import { ROLE, APPOINTMENT } from "app/shared/config";
import { Appointment } from "app/core/domain/model/appointment";
import { MatTableDataSource, MatSort } from "@angular/material";
import { AppointmentService } from "app/core/domain/services/appointment.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user: Profile;
  public userRole: string;
  public isDisplay: number = 0;

  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public displayedColumns: string[] = [
    "index",
    "appointmentCode",
    "timeOfService",
    "shift",
    "doctor",
    "departmentName",
    "status"
  ];
  public dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of ProfileComponent.
   * @param {UserService} userService
   * @param {AuthenticationService} authenticateService
   * @param {AccountService} accountService
   * @memberof ProfileComponent
   */
  constructor(
    private accountService: AccountService,
    private appointmentService: AppointmentService
  ) {}

  /**
   * @description
   * @memberof ProfileComponent
   */
  ngOnInit() {
    this.getCurrentUser();
    this.getAllAppointments();
  }

  /**
   * @description
   * @returns {*}
   * @memberof ProfileComponent
   */
  public getCurrentUser(): any {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.user = res;

      if (this.user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
        this.userRole = ROLE.ADMIN;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
        this.userRole = ROLE.DOCTOR;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
        this.userRole = ROLE.NURSE;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
        this.userRole = ROLE.PATIENT;
      }

      if (this.userRole) {
        if (this.userRole === ROLE.ADMIN) {
          this.isDisplay = 1;
        } else if (this.userRole == ROLE.DOCTOR) {
          this.isDisplay = 2;
        } else if (this.userRole == ROLE.NURSE) {
          this.isDisplay = 3;
        } else if (this.userRole == ROLE.PATIENT) {
          this.isDisplay = 4;
        }
      }

      if(this.isDisplay == 2) {
        this.displayedColumns = [
          "index",
          "appointmentCode",
          "timeOfService",
          "patient",
          "shift",
          "departmentName",
          "status"
        ];
      }

      if(this.isDisplay == 4) {
        this.displayedColumns = [
          "index",
          "appointmentCode",
          "timeOfService",
          "doctor",
          "shift",
          "departmentName",
          "status"
        ];
      }
    });
  }

  /**
   * @description
   * @memberof ProfileComponent
   */
  millisToUTCDate = function(millis) {
    return this.toUTCDate(new Date(millis));
  };

  /**
   * @description
   * @memberof PatientsProfileComponent
   */
  getAllAppointments = () => {
    this.appointmentService.findAllButTop10().subscribe(response => {
      if (response != null) {
        this.dataSource.data = response as Appointment[];
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      }
    });
  };

  /**
   * @description
   * @private
   * @memberof PatientsProfileComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @memberof ProfileComponent
   */
  public toUTCDate(date) {
    var _utc = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    return _utc;
  }

  /**
   * @description
   * @private
   * @param {number} status
   * @returns
   * @memberof PatientsProfileComponent
   */
  public filterStatusAppointment(status: number) {
    if (status === APPOINTMENT.REQUEST) {
      return APPOINTMENT.REQUEST_LABEL;
    } else if (status === APPOINTMENT.APPROVE) {
      return APPOINTMENT.APPROVE_LABEL;
    } else if (status === APPOINTMENT.CANCEL) {
      return APPOINTMENT.CANCEL_LABEL;
    } else if (status === APPOINTMENT.SUCCESS) {
      return APPOINTMENT.SUCCESS_LABEL;
    } else if (status === APPOINTMENT.FINISH) {
      return APPOINTMENT.FINISH_LABEL;
    }
  }

  public filterShift(shift: number) {
    if (shift === APPOINTMENT.TIME_1) {
      return APPOINTMENT.APP_TIME_1;
    }

    if (shift === APPOINTMENT.TIME_2) {
      return APPOINTMENT.APP_TIME_2;
    }

    if (shift === APPOINTMENT.TIME_3) {
      return APPOINTMENT.APP_TIME_3;
    }

    if (shift === APPOINTMENT.TIME_4) {
      return APPOINTMENT.APP_TIME_4;
    }

    if (shift === APPOINTMENT.TIME_5) {
      return APPOINTMENT.APP_TIME_5;
    }

    if (shift === APPOINTMENT.TIME_6) {
      return APPOINTMENT.APP_TIME_6;
    }

    if (shift === APPOINTMENT.TIME_7) {
      return APPOINTMENT.APP_TIME_7;
    }

    if (shift === APPOINTMENT.TIME_8) {
      return APPOINTMENT.APP_TIME_8;
    }

    if (shift === APPOINTMENT.TIME_9) {
      return APPOINTMENT.APP_TIME_9;
    }

    if (shift === APPOINTMENT.TIME_10) {
      return APPOINTMENT.APP_TIME_10;
    }

    if (shift === APPOINTMENT.TIME_11) {
      return APPOINTMENT.APP_TIME_11;
    }

    return APPOINTMENT.APP_TIME_12;
  }
}
