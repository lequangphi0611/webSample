/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-medical-histories-dialog'
 * @param {any} templateUrl:'./medical-histories-dialog.component.html'
 * @param {any} styleUrls:['./medical-histories-dialog.component.scss']}
 * @returns {any}
 */
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MedicalHistory } from "app/core/domain/model/medical-history";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MedicalHistoryService } from "app/core/domain/services/medical-history.service";
import { Appointment } from "app/core/domain/model/appointment";
import { AppointmentService } from "app/core/domain/services/appointment.service";
import { Patient } from "app/core/domain/model/patient";
import { PatientService } from "app/core/domain/services/patient.service";
import { Observable } from 'rxjs';
import { BLOOD_GROUP } from 'app/shared/config';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: "app-medical-histories-dialog",
  templateUrl: "./medical-histories-dialog.component.html",
  styleUrls: ["./medical-histories-dialog.component.scss"]
})
export class MedicalHistoriesDialogComponent implements OnInit {
  public medicalHistoryForm: FormGroup;
  public medicalHistory: MedicalHistory;
  public appointments: Appointment[];
  public patients: Patient[];
  public id: number;

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

  public seletedBloodGroup(optionValue: any) {
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

  public onChangeBloodGroup(e) {

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
    private dialogRef: MatDialogRef<MedicalHistoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private medicalHistoryService: MedicalHistoryService,
    private appointmentService: AppointmentService,
    private patientService: PatientService
  ) {
    this.id = data.id;
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDataById();
    this.getAppointment();
    this.getPatient();
    this.getBloodGroups();
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  getAppointment() {
    this.appointmentService.findAll().subscribe(res => {
      this.appointments = res;
    });
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  getPatient() {
    this.patientService.findAll().subscribe(res => {
      this.patients = res;
    });
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  getDataById = () => {
    const id = this.id;

    if (id != 0) {
      this.medicalHistoryService.findById(id).subscribe(res => {
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
    this.dialogRef.close(this.medicalHistoryForm.value);
  }

  /**
   * @description
   * @memberof MedicalHistoriesDialogComponent
   */
  close() {
    this.dialogRef.close();
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
}
