/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-appointments-list"
 * @param {any} templateUrl:"./appointments-list.component.html"
 * @param {any} styleUrls:["./appointments-list.component.scss"]}
 * @returns {any}
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { Router } from "@angular/router";
import { Appointment } from "app/core/domain/model/appointment";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { APPOINTMENT } from 'app/shared/config';

@Component({
  selector: "app-appointments-list",
  templateUrl: "./appointments-list.component.html",
  styleUrls: ["./appointments-list.component.scss"]
})
export class AppointmentsListComponent implements OnInit {
  public isLoaded: boolean = false;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public displayedColumns: string[] = [
    "index",
    "appointmentCode",
    "timeOfService",
    "shift",
    "patient",
    "doctor",
    "departmentName",
    "status",
    "actions"
  ];
  public dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of AppointmentsListComponent.
   * @param {MatDialog} dialog
   * @param {AppointmentService} appointmentService
   * @param {MatSnackBar} snackBar
   * @param {Router} router
   * @memberof AppointmentsListComponent
   */
  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @description
   * @param {*} e
   * @memberof AppointmentsListComponent
   */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  /**
   * @description
   * @memberof AppointmentsListComponent
   */
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /**
   * @description
   * @memberof AppointmentsListComponent
   */
  ngOnInit() {
    this.getAllAppointments();
  }

  /**
   * @description
   * @memberof AppointmentsListComponent
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @description
   * @private
   * @memberof AppointmentsListComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @memberof AppointmentsListComponent
   */
  getAllAppointments = () => {
    this.appointmentService.findAll().subscribe(response => {
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
   * @param {number} id
   * @memberof AppointmentsListComponent
   */
  toForm(id: number) {
    if (id === 0) {
      this.router.navigate(["management/appointments/add"]);
    } else {
      this.router.navigate(["management/appointments/edit/", id]);
    }
  }

  /**
   * @description
   * @param {number} id
   * @memberof AppointmentsListComponent
   */
  toDetail(id: number) {
    this.router.navigate(["management/appointments/info/", id]);
  }

  /**
   * @description
   * @param {number} id
   * @param {string} code
   * @memberof AppointmentsListComponent
   */
  openDeleteDialog(id: number, code: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id,
      title: "cuộc hẹn " + code
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == id) {
        this.appointmentService.deleteById(data).subscribe(
          data => {
            this.openSnackBar("Đã xóa thành công", "Cuộc hẹn");
            this.getAllAppointments();
          },
          error => this.openSnackBar("Có lỗi xảy ra", "Cuộc hẹn")
        );
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof AppointmentsListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /**
   * @description
   * @param {Appointment} model
   * @memberof AppointmentsListComponent
   */
  processSave(model: Appointment) {
    this.appointmentService.save(model).subscribe(
      res => {
        this.openSnackBar("Thêm mới thành công", "Khoa");
        this.getAllAppointments();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Khoa")
    );
  }

  /**
   * @description
   * @param {Appointment} model
   * @memberof AppointmentsListComponent
   */
  processUpdate(model: Appointment) {
    this.appointmentService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Khoa");
        this.getAllAppointments();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Khoa")
    );
  }

  /**
   * @description
   * @memberof AppointmentsListComponent
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
   * @memberof AppointmentsListComponent
   */
  millisToUTCDate = function(millis) {
    return this.toUTCDate(new Date(millis));
  };

  /**
   * @description
   * @param {*} date
   * @returns
   * @memberof AppointmentsListComponent
   */
  changeTimezone(date) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh"
      })
    );

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() + diff);
  }
  
  /**
   * @description
   * @private
   * @param {number} shift
   * @returns
   * @memberof AppointmentsInfoComponent
   */
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

  /**
   * @description
   * @private
   * @param {number} status
   * @returns
   * @memberof AppointmentsInfoComponent
   */
  private filterStatusAppointment(status: number) {
    if (status === APPOINTMENT.REQUEST) {
      return APPOINTMENT.REQUEST_LABEL;
    } else if (status === APPOINTMENT.APPROVE){
      return APPOINTMENT.APPROVE_LABEL;
    } else if (status === APPOINTMENT.CANCEL){
      return APPOINTMENT.CANCEL_LABEL;
    } else if (status === APPOINTMENT.SUCCESS){
      return APPOINTMENT.SUCCESS_LABEL;
    } else if (status === APPOINTMENT.FINISH){
      return APPOINTMENT.FINISH_LABEL;
    }
  }
}
