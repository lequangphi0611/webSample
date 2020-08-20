import { Component, OnInit } from '@angular/core';
import { Patient } from 'app/core/domain/model/patient';
import { MedicalHistory } from 'app/core/domain/model/medical-history';
import { Doctor } from 'app/core/domain/model/doctor';
import { User } from 'app/core/domain/model/user';
import { AppointmentService } from 'app/core/domain/services/appointment.service';
import { PatientService } from 'app/core/domain/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'app/core/domain/services/doctor.service';
import { UserService } from 'app/core/domain/services/user.service';
import { MatSnackBar } from '@angular/material';
import { AccountService } from 'app/core/domain/services/account.service';
import { MedicalHistoryService } from 'app/core/domain/services/medical-history.service';
import { Appointment } from 'app/core/domain/model/appointment';
import { APPOINTMENT, ROLE } from 'app/shared/config';
import { Location } from '@angular/common';
import { BLOOD_GROUP } from 'app/shared/config';

@Component({
  selector: 'app-medical-histories-detail',
  templateUrl: './medical-histories-detail.component.html',
  styleUrls: ['./medical-histories-detail.component.scss']
})
export class MedicalHistoriesDetailComponent implements OnInit {
  public medicalHistory: MedicalHistory;
  public appointment: Appointment;
  public patient: Patient;
  public doctor: Doctor;
  public user: User;
  public userLogged: User;
  public id: number = 0;
  public userRole: string;
  public isDisplay: number = 0;

  /**
   *Creates an instance of MedicalHistoriesDetailComponent.
   * @param {AppointmentService} appointmentService
   * @param {ActivatedRoute} route
   * @param {PatientService} patientService
   * @param {DoctorService} doctorService
   * @param {Router} router
   * @param {Location} location
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   * @param {AccountService} accountService
   * @memberof MedicalHistoriesDetailComponent
   */
  constructor(
    private appointmentService: AppointmentService,
    private medicalHistoryService: MedicalHistoryService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getInfoAppointmentById();
  }

  /**
   * @description
   * @param {*} value
   * @returns
   * @memberof MedicalHistoriesDetailComponent
   */
  public filterChooseBloodGroup(value){
    switch(value) {
      case BLOOD_GROUP.BLOOD_GROUP_1:
        return BLOOD_GROUP.BLOOD_GROUP_1_LABEL;
      case BLOOD_GROUP.BLOOD_GROUP_2:
        return BLOOD_GROUP.BLOOD_GROUP_2_LABEL;
      case BLOOD_GROUP.BLOOD_GROUP_3:
        return BLOOD_GROUP.BLOOD_GROUP_3_LABEL;
      case BLOOD_GROUP.BLOOD_GROUP_4:
        return BLOOD_GROUP.BLOOD_GROUP_4_LABEL;
    }
  }

  /**
   * @description
   * @memberof AppointmentsInfoComponent
   */
  getInfoAppointmentById() {
    if (this.route.snapshot.url[1]) {
      this.id = Number.parseInt(this.route.snapshot.url[1].path);
    }
    if (undefined != this.id && this.id != 0) {
      this.medicalHistoryService.findById(this.id).subscribe(res => {
        this.medicalHistory = res;

        this.patientService
          .findById(res.patientDTO.id)
          .subscribe(pati => (this.patient = pati));

        if (res.doctorDTO) {
          this.doctorService
            .findById(res.doctorDTO.id)
            .subscribe(doct => (this.doctor = doct));
        }

        this.userService
          .findById(res.createdBy)
          .subscribe(usr => (this.user = usr));
      });
    }
  }

  /**
   * @description
   * @memberof AppointmentsInfoComponent
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
   * @memberof AppointmentsInfoComponent
   */
  millisToUTCDate = function(millis) {
    return this.toUTCDate(new Date(millis));
  };

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

  /**
   * @description
   * @private
   * @param {number} shift
   * @returns
   * @memberof AppointmentsInfoComponent
   */
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
   * @memberof AppointmentsInfoComponent
   */
  private goBack() {
    this.location.back();
  }

  /**
   * @description
   * @private
   * @memberof AppointmentsInfoComponent
   */
  private goToList() {
    this.router.navigate(["management/appointments/list"]);
  }

  /**
   * @description
   * @private
   * @memberof AppointmentsInfoComponent
   */
  private toForm() {
    if (this.appointment.status === APPOINTMENT.REQUEST) {
      this.router.navigate(["management/appointments/edit/", this.id]);
    }
  }

  /**
   * @description
   * @returns {*}
   * @memberof AppointmentsInfoComponent
   */
  public getCurrentUser(): any {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.userLogged = res;

      this.userRole = this.filterRole(this.userLogged);

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
   * @param {User} user
   * @returns
   * @memberof AppointmentsInfoComponent
   */
  filterRole(user: User) {
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
   * @memberof AppointmentsInfoComponent
   */
  toCancel() {
    this.appointmentService.cancel(this.appointment).subscribe(
      res => {
        this.openSnackBar(
          "Bạn đã hủy cuộc hẹn " + res.appointmentCode,
          "Cuộc hẹn"
        );
        this.goToList();
      },
      err => this.openSnackBar("Có lỗi xảy ra, vui lòng thử lại", "Cuộc hẹn")
    );
  }

  /**
   * @description
   * @memberof AppointmentsInfoComponent
   */
  toApprove() {
    this.appointmentService.approve(this.appointment).subscribe(
      res => {
        this.openSnackBar(
          "Bạn đã duyệt cuộc hẹn " + res.appointmentCode,
          "Cuộc hẹn"
        );
        this.goToList();
      },
      err => this.openSnackBar("Có lỗi xảy ra, vui lòng thử lại", "Cuộc hẹn")
    );
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof AppointmentsFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
