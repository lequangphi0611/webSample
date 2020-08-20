/**
 * 描述
 * @date 2019-12-01
 * @param {any} "../../shared/data/chartist.json"
 * @returns {any}
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { DepartmentService } from "app/core/domain/services/department.service";
import { DoctorService } from "app/core/domain/services/doctor.service";
import { PatientService } from "app/core/domain/services/patient.service";
import * as Chartist from "chartist";
import { ChartEvent, ChartType } from "ng-chartist";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Appointment } from "app/core/domain/model/appointment";
import { Router } from "@angular/router";
import { APPOINTMENT } from "app/shared/config";

// declare var require: any;

// const data: any = require("../../shared/data/chartist.json");x

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public doctorSize: number = 0;
  public patientSize: number = 0;
  public appointmentSize: number = 0;
  public departmentSize: number = 0;

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
    "status"
  ];
  public dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllAppointments();
    this.doctorService.findAll().subscribe(res => {
      if (res) this.doctorSize = res.length;
    });

    this.patientService.findAll().subscribe(res => {
      if (res) this.patientSize = res.length;
    });

    this.appointmentService.findAll().subscribe(res => {
      if (res) this.appointmentSize = res.length;
    });

    this.departmentService.findAll().subscribe(res => {
      if (res) this.departmentSize = res.length;
    });
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(this.showPosition);
  //   }
  // }

  // showPosition(position) {
  //   if(position && position.coords){
  //     this.getForecastWeather(position.coords.latitude, position.coords.longitude).subscribe(res => {
  //       console.log(res);
  //     })
  //   }
  // }

  // getForecastWeather(latitude, longitude): Observable<any>{
  //   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=03d81f7b88e51dc1dfaf1b8b7b950ee8`;
  //   return this.http.get<any>(url).pipe();
  // }

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
  public millisToUTCDate (millis) {
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
}
