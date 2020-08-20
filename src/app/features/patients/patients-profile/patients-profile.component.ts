/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-patients-profile'
 * @param {any} templateUrl:'./patients-profile.component.html'
 * @param {any} styleUrls:['./patients-profile.component.scss']}
 * @returns {any}
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Patient } from "app/core/domain/model/patient";
import { PatientService } from "app/core/domain/services/patient.service";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { Appointment } from "app/core/domain/model/appointment";
import { MatTableDataSource, MatSort } from "@angular/material";
import { APPOINTMENT } from "app/shared/config";

@Component({
  selector: "app-patients-profile",
  templateUrl: "./patients-profile.component.html",
  styleUrls: ["./patients-profile.component.scss"]
})
export class PatientsProfileComponent implements OnInit {
  public user: Patient;
  public userRole: string;
  public isDisplay: number = 0;
  public id: number;

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
    "departmentName"
  ];
  public dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of ProfileComponent.
   * @memberof ProfileComponent
   */
  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  /**
   * @description
   * @memberof ProfileComponent
   */
  ngOnInit() {
    this.getDataById();
  }

  /**
   * @description
   * @memberof PatientsProfileComponent
   */
  private getAllAppointments = (id: number) => {
    this.appointmentService.findAllButTop10Patient(id).subscribe(response => {
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
   * @private
   * @memberof PatientsProfileComponent
   */
  private getDataById = () => {
    if (this.route.snapshot.url[1]) {
      this.id = Number.parseInt(this.route.snapshot.url[1].path);
    }
    if (undefined != this.id && this.id != 0) {
      this.patientService.findById(this.id).subscribe(res => {
        this.user = res;
      });
    }

    this.getAllAppointments(this.id);
  };

  /**
   * @description
   * @memberof ProfileComponent
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
   * @param {*} millis
   * @returns
   * @memberof PatientsProfileComponent
   */
  public millisToUTCDate(millis) {
    return this.toUTCDate(new Date(millis));
  }
}
