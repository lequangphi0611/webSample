import { Location } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Appointment } from "app/core/domain/model/appointment";
import { Department } from "app/core/domain/model/department";
import { Doctor } from "app/core/domain/model/doctor";
import { Patient } from "app/core/domain/model/patient";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { DepartmentService } from "app/core/domain/services/department.service";
import { DoctorService } from "app/core/domain/services/doctor.service";
import { PatientService } from "app/core/domain/services/patient.service";
import { APPOINTMENT, ROLE } from "app/shared/config";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { User } from 'app/core/domain/model/user';
import { AccountService } from 'app/core/domain/services/account.service';

@Component({
  selector: 'app-home-assign',
  templateUrl: './home-assign.component.html',
  styleUrls: ['./home-assign.component.scss']
})
export class HomeAssignComponent implements OnInit {
  public doctorControl = new FormControl();
  public form: FormGroup;
  public appointment: Appointment;
  public doctors: Doctor[];
  public doctor: Doctor;
  public patients: Patient[];
  public departments: Department[];
  public patient: Patient;
  public id: number;
  public userLogged: User;
  public userRole: string;
  public isDisplay: number = 0;
  public patientSelected: boolean = false;
  public doctorSelected: boolean = false;
  public filteredPatients: Observable<Patient[]>;
  public filteredDoctors: Observable<Doctor[]>;
  public shiftsIgnore: Array<any>;
  public shiftss: Array<any>;
  public isDisableButton: boolean = true;
  public min = new Date();
  public minDate = this.min.setDate(this.min.getDate() - 5);

  public shifts: Array<any> = [
    {
      id: APPOINTMENT.TIME_1,
      detail: APPOINTMENT.APP_TIME_1
    },
    {
      id: APPOINTMENT.TIME_2,
      detail: APPOINTMENT.APP_TIME_2
    },
    {
      id: APPOINTMENT.TIME_3,
      detail: APPOINTMENT.APP_TIME_3
    },
    {
      id: APPOINTMENT.TIME_4,
      detail: APPOINTMENT.APP_TIME_4
    },
    {
      id: APPOINTMENT.TIME_5,
      detail: APPOINTMENT.APP_TIME_5
    },
    {
      id: APPOINTMENT.TIME_6,
      detail: APPOINTMENT.APP_TIME_6
    },
    {
      id: APPOINTMENT.TIME_7,
      detail: APPOINTMENT.APP_TIME_7
    },
    {
      id: APPOINTMENT.TIME_8,
      detail: APPOINTMENT.APP_TIME_8
    },
    {
      id: APPOINTMENT.TIME_9,
      detail: APPOINTMENT.APP_TIME_9
    },
    {
      id: APPOINTMENT.TIME_10,
      detail: APPOINTMENT.APP_TIME_10
    },
    {
      id: APPOINTMENT.TIME_11,
      detail: APPOINTMENT.APP_TIME_11
    },
    {
      id: APPOINTMENT.TIME_12,
      detail: APPOINTMENT.APP_TIME_12
    }
  ];
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
   *Creates an instance of AppointmentsFormComponent.
   * @param {FormBuilder} fb
   * @param {AppointmentService} appointmentService
   * @param {DoctorService} doctorService
   * @param {PatientService} patientService
   * @param {MatDialog} dialog
   * @param {MatSnackBar} snackBar
   * @param {ActivatedRoute} route
   * @param {DepartmentService} departmentService
   * @param {Router} router
   * @param {Location} location
   * @memberof AppointmentsFormComponent
   */
  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private router: Router,
    private location: Location,
    private accountService: AccountService
  ) {}

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  ngOnInit() {
    this.getCurrentUser();
    this.buildForm();
    this.getDataById();
    this.shiftss = this.shifts;
  }

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  ngOnDestroy() {}

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  ngAfterViewInit() {}

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
   * @memberof AppointmentsFormComponent
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
   * @private
   * @memberof AppointmentsFormComponent
   */
  private getAllDoctors = () => {
    const departmentId = this.form.value.departmentId;
    if (this.appointment && this.appointment.departmentId) {
      this.doctorService
        .findAllByDepartment(
          departmentId ? departmentId : this.appointment.departmentId
        )
        .subscribe((response: Doctor[]) => {
          // if (response != null) {
          this.doctors = response;

          this.filteredDoctors = this.form.controls.doctorName.valueChanges.pipe(
            startWith(""),
            map(value => this._filterDoctor(this.doctors, value))
          );
          // }
        });
    } else {
      if (departmentId) {
        this.doctorService
          .findAllByDepartment(departmentId)
          .subscribe((response: Doctor[]) => {
            // if (response != null) {
            this.doctors = response;

            this.filteredDoctors = this.form.controls.doctorName.valueChanges.pipe(
              startWith(""),
              map(value => this._filterDoctor(this.doctors, value))
            );
            // }
          });
      }
    }
  };

  /**
   * @description
   * @private
   * @memberof AppointmentsFormComponent
   */
  private getDataById = () => {
    if (this.route.snapshot.url[1]) {
      this.id = Number.parseInt(this.route.snapshot.url[1].path);
    }
    if (undefined != this.id && this.id != 0) {
      this.appointmentService.findById(this.id).subscribe(res => {
        this.appointment = res;
        this.patchValue(this.appointment);
        this.getAllDoctors();
      });
    } else {
      this.getAllDoctors();
    }
  };

  /**
   * @description
   * @private
   * @memberof AppointmentsFormComponent
   */
  private buildForm() {
    this.form = this.fb.group({
      timeOfService: new FormControl(new Date(new Date().setHours(0, 0, 0, 0))),
      departmentId: ["", Validators.required],
      shift: [
        {
          value: ""
        },
        Validators.required
      ],
      departmentName: [''],
      appointmentCode: [""],
      createdBy: [""],
      patientId: ["", [Validators.required]],
      patientName: [""],
      status: [""],
      doctorId: ["", Validators.required],
      doctorName: [""],
      note: [""],
      id: [""],
      reason: [""],
      // patient
      cardId: [
        {
          value: ""
        }
      ],
      insuranceCardNumber: [
        {
          value: ""
        }
      ],
      addressPatient: [
        {
          value: ""
        }
      ],
      phonePatient: [
        {
          value: ""
        }
      ],
      finishTime: [
        {
          value: ""
        }
      ],
      // doctor
      phoneDoctor: [
        {
          value: ""
        }
      ],
      emailDoctor: [
        {
          value: ""
        }
      ]
    });
  }

  /**
   * @description
   * @private
   * @memberof AppointmentsFormComponent
   */
  private save() {
    // (this.form.value);
  }
  
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
   * @memberof AppointmentsFormComponent
   */
  private findPatientById = (id: number) => {
    this.patientService.findById(id).subscribe(res => {
      this.patient = res;
      this.patientSelected = true;

      this.form.controls["patientId"].setValue(this.patient.id);
      this.form.controls["cardId"].setValue(this.patient.cardId);

      this.form.controls["insuranceCardNumber"].setValue(
        this.patient.insuranceCardNumber
      );

      this.form.controls["addressPatient"].setValue(this.patient.address);
      this.form.controls["phonePatient"].setValue(this.patient.phone);
    });
  };

  /**
   * @description
   * @private
   * @memberof AppointmentsFormComponent
   */
  private findDoctorById = (id: number) => {
    this.doctorService.findById(id).subscribe(res => {
      this.doctor = res;
      this.doctorSelected = true;

      this.form.controls["doctorId"].setValue(this.doctor.id);
      this.form.controls["emailDoctor"].setValue(this.doctor.email);
      this.form.controls["phoneDoctor"].setValue(
        this.doctor.phone ? this.doctor.phone : ""
      );
    });
  };

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  close() {}

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  patchValue = (model: Appointment) => {
    if (model.patientId) {
      this.findPatientById(model.patientId);
    }
    if (model.doctorId) {
      this.findDoctorById(model.doctorId);
    }
    this.patientService.findById(model.patientId).subscribe(res => {
      this.patient = res;
      this.patientSelected = true;
      this.form.patchValue({
        id: model.id,
        departmentId: model.departmentId,
        appointmentCode: model.appointmentCode,
        createdBy: model.createdBy,
        timeOfService: model.timeOfService,
        shift: model.shift,
        patientId: model.patientId,
        patientName: this.patient
          ? this.patient.firstName + " " + this.patient.lastName
          : "",
        doctorId: model.doctorId,
        doctorName: this.doctor
          ? this.doctor.firstName + " " + this.doctor.lastName
          : "",
        status: model.status,
        note: model.note,
        reason: model.reason,
        departmentName: model.departmentName
      });

      if (this.form.controls.doctorId.value) {
        this.doctorService
          .getFreeTimeOfService(
            this.form.controls.doctorId.value,
            this.form.controls.timeOfService.value,
            this.form.controls.departmentId.value
          )
          .subscribe(res => {
            this.shiftsIgnore = res;
            this.duplicates();
          });
      }
    });
  };

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof AppointmentsFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  /**
   * @description
   * @private
   * @param {any[]} arr
   * @param {string} value
   * @returns {any[]}
   * @memberof AppointmentsFormComponent
   */
  private _filterDoctor(arr: any[], value: string): any[] {
    const filterValue = value;
    const peopleGroup = arr;
    this.doctorSelected = false;

    if (typeof value == "number" || typeof value == "object") {
      this.form.controls["doctorName"].setValue("");
      return peopleGroup;
    }

    let listAfterFilter = peopleGroup.filter(
      option =>
        option.firstName
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) !== -1
    );

    if (listAfterFilter.length == 0) {
      listAfterFilter = peopleGroup.filter(
        option =>
          option.lastName
            .toLocaleLowerCase()
            .indexOf(filterValue.trim().toLocaleLowerCase()) !== -1
      );
    }

    return listAfterFilter;
  }

  /**
   * @description
   * @private
   * @param {Patient} optionValue
   * @memberof AppointmentsFormComponent
   */
  public seletedDoctor(optionValue: Patient) {
    this.findDoctorById(optionValue.id);
    this.form.controls["doctorName"].setValue(
      optionValue.firstName + " " + optionValue.lastName
    );

    const startTime = new Date(this.form.controls.timeOfService.value);
    const timeOfService = new Date(
      Date.UTC(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      )
    );

    this.doctorService
      .getFreeTimeOfService(
        optionValue.id,
        timeOfService,
        this.form.controls.departmentId.value
      )
      .subscribe(res => {
        this.shiftsIgnore = res;
        this.duplicates();
      });
  }

  /**
   * @description
   * @private
   * @param {*} item
   * @returns
   * @memberof AppointmentsFormComponent
   */
  public changeDoctor(item: any) {
    if (item.currentTarget.value == "") {
      this.doctorSelected = false;
      this.form.controls["doctorName"].setValue("");
      this.form.controls["doctorId"].setValue("");
      return;
    }
  }

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  onSubmit() {
    this.isDisableButton = false;
    this.snackBar.open("Đang thực hiện, vui lòng đợi!", "", {
      duration: 2500
    });

    if (this.id) {
      let appointment: any = this.appointment || {};
      appointment.doctorId = this.form.controls.doctorId.value;
      appointment.id = this.form.controls.id.value;

      this.appointmentService.update(appointment).subscribe(
        res => {
          this.openSnackBar(
            "Cập nhật thành công cuộc hẹn, vui lòng kiểm tra lại thông tin cuộc hẹn ",
            res.appointmentCode
          );
          this.router.navigate(["management/appointments/info/", res.id]);
          this.isDisableButton = true;
        },
        err => {
          this.openSnackBar("Có lỗi xảy ra, vui lòng thử lại", "Cuộc hẹn");
          this.isDisableButton = true;
        }
      );
    }
  }

  /**
   * @description
   * @param {*} date
   * @returns
   * @memberof AppointmentsFormComponent
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
   * @memberof AppointmentsFormComponent
   */
  onReset() {
    this.patient = null;
    this.patientSelected = false;
    this.form.patchValue({
      timeOfService: new Date(new Date().setHours(0, 0, 0, 0)),
      departmentId: "",
      patientId: "",
      shift: 0,
      patientName: "",
      note: "",
      reason: ""
    });
  }

  /**
   * @description
   * @memberof AppointmentsFormComponent
   */
  goBack() {
    this.location.back();
  }

  /**
   * @description
   * @param {*} value
   * @memberof AppointmentsFormComponent
   */
  onChangeTime() {
    this.form.controls["timeOfService"].setValue(this.appointment.timeOfService);
  }

  private duplicates() {
    if (this.shiftsIgnore && this.shiftsIgnore.length !== 0) {
      if (this.appointment) {
        if (this.appointment.doctorId == this.form.controls.doctorId.value 
          && this.appointment.departmentId == this.form.controls.departmentId.value) {
          this.shiftsIgnore = this.shiftsIgnore.filter(
            val => val !== this.appointment.shift
          )
        }
      }
      this.shiftss = this.shifts.filter(val => {
        return this.shiftsIgnore.indexOf(val.id) == -1;
      });
    } else {
      this.shiftss = this.shifts;
    }
  }

  public onChangeDepartment(e) {
    if (e.value) {
      this.form.controls["departmentId"].setValue(e.value);
      this.form.controls["doctorName"].setValue('');
      this.form.controls["doctorId"].setValue('');
    }
    this.doctors = null;
    this.getAllDoctors();
  }
}
