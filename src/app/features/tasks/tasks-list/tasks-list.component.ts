import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar,
  MatDialogConfig
} from "@angular/material";
import { Appointment } from "app/core/domain/model/appointment";
import { Router } from "@angular/router";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { AuthenticationService } from "app/core/authentication/authentication.service";
import { User } from "app/core/domain/model/user";
import { AccountService } from "app/core/domain/services/account.service";
import { ROLE, APPOINTMENT } from "app/shared/config";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"]
})
export class TasksListComponent implements OnInit {
  public isLoaded: boolean = false;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public userLogged: User;
  public userRole: string;
  public isDisplay: number;
  public roleCurrentUser: string;
  /**
   * New Date();
   */
  public date: Date = new Date();
  public dd: number = this.date.getDate();
  public mm: number = this.date.getMonth() + 1; //January is 0!
  public yyyy = this.date.getFullYear();
  // public today: string = this.filterDD(this.dd) + "/" + this.mm + "/" + this.yyyy;
  // public nextday: string =
  //   this.filterDD(Number(this.dd) + 1) + "/" + this.mm + "/" + this.yyyy;

  public today: string = this.yyyy + '-' + this.mm + '-' + this.dd;
  public nextday: string = this.yyyy + '-' + this.mm + '-' + (Number(this.dd)+1);
  /**
   * set selected
   */
  public selected: string = "";

  private filterDD(value) {
    if (value && parseInt(value) < 10) {
      return "0".concat(value);
    }

    return value;
  }

  /**
   * displayed
   */
  displayedColumns: string[] = [
    "index",
    "appointmentCode",
    "timeOfService",
    "shift",
    "patient",
    "status",
    "actions"
  ];

  /**
   * @description
   * @memberof TasksListComponent
   */
  public dataSource = new MatTableDataSource<Appointment>();

  /**
   * @description
   * @type {MatSort}
   * @memberof TasksListComponent
   */
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of TasksListComponent.
   * @param {AppointmentService} appointmentService
   * @param {MatSnackBar} snackBar
   * @param {Router} route
   * @param {AuthenticationService} authService
   * @param {AccountService} accountService
   * @memberof TasksListComponent
   */
  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private route: Router,
    private authService: AuthenticationService,
    private accountService: AccountService
  ) {}

  /**
   * @description
   * @param {*} e
   * @memberof TasksListComponent
   */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /**
   * @description
   * @memberof TasksListComponent
   */
  public suttupFilterDay() {
    this.dataSource.filterPredicate = (d, filter) => {
      console.log(d.timeOfService);

      return (d.timeOfService + "").indexOf(filter) !== -1;
      
    };
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  applyFilterDay() {
    console.log(this.selected);
    
    this.dataSource.filter = this.selected;
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  ngOnInit() {
    // this.roleCurrentUser = this.accountService.getCurrentUserLogged();
    this.getAllAppointments();
    this.getCurrentUser();
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @description
   * @private
   * @memberof TasksListComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  getAllAppointments = () => {
    this.appointmentService.getTasks().subscribe(response => {
      this.isLoaded = true;
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
   * @param {string} message
   * @param {string} action
   * @memberof TasksListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /**
   * @description
   * @memberof TasksListComponent
   */
  toUTCDate = function(date) {
    var _utc = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    return _utc;
  };

  /**
   * @description
   * @memberof TasksListComponent
   */
  millisToUTCDate = function(millis) {
    return this.toUTCDate(new Date(millis));
  };

  /**
   * @description
   * @param {number} id
   * @memberof TasksListComponent
   */
  public toDetail(id: number) {
    this.route.navigate(["management/appointments/info/", id]);
  }

  /**
   * @description
   * @returns {*}
   * @memberof TasksListComponent
   */
  public getCurrentUser(): any {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.userRole = this.filterRole(res);

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
    });
  }

  /**
   * @description
   * @private
   * @param {User} user
   * @returns
   * @memberof TasksListComponent
   */
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
   * @description
   * @memberof TasksListComponent
   */
  public toForm() {
    this.route.navigate(["management/appointments/add"]);
  }

  private filterShift(shift: number) {
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

  /**
   * @description
   * @private
   * @param {number} status
   * @returns
   * @memberof TasksListComponent
   */
  private filterStatusAppointment(status: number) {
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
}
