import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/core/domain/model/appointment';
import { Patient } from 'app/core/domain/model/patient';
import { Doctor } from 'app/core/domain/model/doctor';
import { AppointmentService } from 'app/core/domain/services/appointment.service';
import { PatientService } from 'app/core/domain/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'app/core/domain/services/doctor.service';
import { UserService } from 'app/core/domain/services/user.service';
import { MatSnackBar } from '@angular/material';
import { AccountService } from 'app/core/domain/services/account.service';
import { APPOINTMENT, ROLE } from 'app/shared/config';
import { User } from 'app/core/domain/model/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointments-finished-info',
  templateUrl: './appointments-finished-info.component.html',
  styleUrls: ['./appointments-finished-info.component.scss']
})
export class AppointmentsFinishedInfoComponent implements OnInit {
  public appointment: Appointment;
  public patient: Patient;
  public doctor: Doctor;
  public user: User;
  public userLogged: User;
  public id: number = 0;
  public userRole: string;
  public isDisplay: number = 0;

  /**
   *Creates an instance of AppointmentsInfoComponent.
   * @param {AppointmentService} appointmentService
   * @param {ActivatedRoute} route
   * @param {PatientService} patientService
   * @param {DoctorService} doctorService
   * @param {Router} router
   * @param {Location} location
   * @param {UserService} userService
   * @param {AccountService} accountService
   * @memberof AppointmentsInfoComponent
   */
  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  /**
   * @description
   * @memberof AppointmentsInfoComponent
   */
  ngOnInit() {
    this.getInfoAppointmentById();
    this.getCurrentUser();
  }

  /**
   * @description
   * @memberof AppointmentsInfoComponent
   */
  getInfoAppointmentById() {
    if (this.route.snapshot.params.id) {
      this.id = Number.parseInt(this.route.snapshot.params.id);
    }
    if (undefined != this.id && this.id != 0) {
      this.appointmentService.findById(this.id).subscribe(res => {
        this.appointment = res;

        this.patientService
          .findById(res.patientId)
          .subscribe(pati => (this.patient = pati));
        if (res.doctorId) {
          this.doctorService
            .findById(res.doctorId)
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
   * @param {string} message
   * @param {string} action
   * @memberof AppointmentsFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  goToUpdate(id: number) {
    this.router.navigate(["management/appointments/finished/update/0/" + id]);
  }
}
