import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MedicalHistory } from "app/core/domain/model/medical-history";
import { Appointment } from "app/core/domain/model/appointment";
import { Patient } from "app/core/domain/model/patient";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { MedicalHistoryService } from "app/core/domain/services/medical-history.service";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { APPOINTMENT, BLOOD_GROUP } from 'app/shared/config';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Location } from "@angular/common";

@Component({
  selector: "app-appointments-finish-update",
  templateUrl: "./appointments-finish-update.component.html",
  styleUrls: ["./appointments-finish-update.component.scss"]
})
export class AppointmentsFinishUpdateComponent implements OnInit {
  public medicalHistoryForm: FormGroup;
  public medicalHistory: MedicalHistory;
  public id: number;
  public appId: number;
  public appointment: Appointment;
  public filteredBloodGroups: Observable<any[]>;
  public bloodGroups: Array<any> = [
    {
      id: BLOOD_GROUP.BLOOD_GROUP_1,
      value: BLOOD_GROUP.BLOOD_GROUP_1_LABEL
    },
    {
      id: BLOOD_GROUP.BLOOD_GROUP_2,
      value: BLOOD_GROUP.BLOOD_GROUP_2_LABEL
    },
    {
      id: BLOOD_GROUP.BLOOD_GROUP_3,
      value: BLOOD_GROUP.BLOOD_GROUP_3_LABEL
    },
    {
      id: BLOOD_GROUP.BLOOD_GROUP_4,
      value: BLOOD_GROUP.BLOOD_GROUP_4_LABEL
    }
  ]

  private seletedBloodGroup(optionValue: any) {
    this.medicalHistoryForm.controls["bloodGroupD"].setValue(
      this.filterChooseBloodGroup(optionValue.value)
    );
    this.medicalHistoryForm.controls["bloodGroup"].setValue(
      optionValue.value
    );
  }

  private filterChooseBloodGroup(value){
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

  private getBloodGroups = () => {
    this.filteredBloodGroups = this.medicalHistoryForm.controls.bloodGroupD.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(this.bloodGroups, value))
    );
  }

  private _filter(arr: any[], value: string): any[] {
    const filterValue = value;

    let listAfterFilter = arr.filter(
      option =>
        option.value
          .toLocaleLowerCase()
          .indexOf(filterValue) !== -1
    );

    return listAfterFilter;
  }

  private onChangeBloodGroup(e) {

  }

  /**
   *Creates an instance of MedicalHistoriesDialogComponent.
   * @param {FormBuilder} fb
   * @param {MatDialogRef<MedicalHistoriesDialogComponent>} dialogRef
   * @param {*} data
   * @param {MedicalHistoryService} medicalHistoryService
   * @param {AppointmentService} appointmentService
   * @param {PatientService} patientService
   * @memberof MedicalHistoriesDialogComponent
   */
  constructor(
    private fb: FormBuilder,
    private medicalHistoryService: MedicalHistoryService,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDataById();
    this.getBloodGroups();
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  getDataById = () => {
    if (this.route.snapshot.params.appId) {
      this.appId = Number.parseInt(this.route.snapshot.params.appId);
    }

    if (this.route.snapshot.params.id) {
      this.id = Number.parseInt(this.route.snapshot.params.id);
    }

    if (this.appId && this.appId != 0) {
      this.appointmentService.findById(this.appId).subscribe(res => {
        this.appointment = res;
      })
    }

    if (this.id && this.id != 0) {
      this.medicalHistoryService.findById(this.id).subscribe(res => {
        this.medicalHistory = res;
        this.patchValue(this.medicalHistory);
      });
    }
  };

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  buildForm() {
    this.medicalHistoryForm = this.fb.group({
      id: [""],
      adviceFromDoctor: ["", [Validators.required]],
      bloodGroup: ["", [Validators.required]],
      bloodGroupD: ["", [Validators.required]],
      result: ["", [Validators.required]],
      bloodPressure: ["", [Validators.required]],
      tempBody: ["", [Validators.required]],
      remedial: ["", [Validators.required]],
      signsOfIllness: ["", [Validators.required]],
      note: [""],
      appointmentId: [""],
      userId: [""]
    });
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  save() {
    this.medicalHistoryForm.controls["appointmentId"].setValue(this.appointment.id);
    this.medicalHistoryService.save(this.medicalHistoryForm.value).subscribe(
      res => {
        this.openSnackBar(
          "Cập nhật thành công thông tin khám ",
          this.appointment.appointmentCode
        );
        // this.medicalHistory = res;
        // this.patchValue(res);

        this.router.navigate(['management/medical-history/list'])
      },
      err => {
        this.openSnackBar("Vui lòng thử lại", this.appointment.appointmentCode);
      }
    );
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  close() {
    // this.dialogRef.close();
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  patchValue = (model: MedicalHistory) => {
    this.medicalHistoryForm.patchValue({
      id: model.id,
      adviceFromDoctor: model.adviceFromDoctor,
      bloodGroup: model.bloodGroup,
      bloodPressure: model.bloodPressure,
      tempBody: model.tempBody,
      remedial: model.remedial,
      signsOfIllness: model.signsOfIllness,
      note: model.note,
      appointmentId: model.appointmentId,
      userId: model.userId,
      result: model.result,
      bloodGroupD: this.filterChooseBloodGroup(model.bloodGroup)
    });
  };

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

  toReset() {
    this.medicalHistoryForm.controls["adviceFromDoctor"].setValue('');
    this.medicalHistoryForm.controls["bloodGroup"].setValue('');
    this.medicalHistoryForm.controls["bloodGroupD"].setValue('');
    this.medicalHistoryForm.controls["bloodPressure"].setValue('');
    this.medicalHistoryForm.controls["tempBody"].setValue('');
    this.medicalHistoryForm.controls["remedial"].setValue('');
    this.medicalHistoryForm.controls["signsOfIllness"].setValue('');
    this.medicalHistoryForm.controls["note"].setValue('');
    this.medicalHistoryForm.controls["userId"].setValue('');
    this.medicalHistoryForm.controls["appointmentId"].setValue('');
    this.medicalHistoryForm.controls["result"].setValue('');
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

  private goBack() {
    this.location.back();
  }
}
