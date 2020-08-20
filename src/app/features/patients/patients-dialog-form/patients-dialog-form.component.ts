/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-patients-dialog-form"
 * @param {any} templateUrl:"./patients-dialog-form.component.html"
 * @param {any} styleUrls:["./patients-dialog-form.component.scss"]}
 * @returns {any}
 */
import { Component, OnInit, Inject, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Patient } from "app/core/domain/model/patient";
import { PatientService } from "app/core/domain/services/patient.service";
import { Gender } from "app/features/doctors/doctors-dialog-form/doctors-dialog-form.component";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { UserService } from 'app/core/domain/services/user.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: "app-patients-dialog-form",
  templateUrl: "./patients-dialog-form.component.html",
  styleUrls: ["./patients-dialog-form.component.scss"]
})
export class PatientsDialogFormComponent implements OnInit {
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;
  @ViewChild('phoneInput', { static: true }) phoneInput: ElementRef;

  public patientForm: FormGroup;
  public patient: Patient;
  public id: number;
  public genders: Gender[] = [
    { id: 0, value: "Chọn giới tính" },
    { id: 1, value: "Nam" },
    { id: 2, value: "Nữ" },
    { id: 3, value: "Khác" }
  ];

  /**
   *Creates an instance of PatientsDialogFormComponent.
   * @param {FormBuilder} fb
   * @param {MatDialogRef<PatientsDialogFormComponent>} dialogRef
   * @param {*} data
   * @param {PatientService} patientService
   * @param {MatDialog} dialog
   * @param {MatSnackBar} snackBar
   * @memberof PatientsDialogFormComponent
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatientsDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService

  ) {
    this.id = data.id;
  }

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDataById();
  }

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  ngAfterViewInit(): void {
    fromEvent<any>(this.emailInput.nativeElement, 'input')
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        switchMap(email => this.userService.existsByEmail(email)),
        filter(exists => exists)
      ).subscribe((exists) => {
        const errors = {
          existsEmail: exists,
        }
        this.emailControl.setErrors(errors)
      });

    fromEvent<any>(this.phoneInput.nativeElement, 'input')
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        switchMap(phone => this.userService.existsByPhone("0" + phone)),
        filter(exists => exists)
      ).subscribe((exists) => {
        const errors = {
          existsPhone: exists
        }
        this.phoneControl.setErrors(errors)
      });
  }
  get emailControl() {
    return this.patientForm.get('email');
  }
  get phoneControl() {
    return this.patientForm.get('phone');
  }
  getDataById = () => {
    const id = this.id;

    if (id != 0) {
      this.patientService.findById(id).subscribe(res => {
        this.patient = res;
        this.patchValue(this.patient);
      });
    }
  };

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  buildForm() {
    this.patientForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      cardId: ["", [Validators.required]],
      insuranceCardNumber: [""],
      email: [""],
      phone: [
        {
          value: "",
          disabled: this.id ? true : false
        },
        [Validators.required, Validators.minLength(7), Validators.maxLength(12)]
      ],
      id: [""],
      gender: [this.genders[0].id],
      userId: [""]
    });
  }

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  save() {
    this.dialogRef.close(this.patientForm.value);
  }

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * @description
   * @memberof PatientsDialogFormComponent
   */
  patchValue = (model: Patient) => {
    this.patientForm.patchValue({
      firstName: model.firstName,
      id: model.id,
      userId: model.userId,
      lastName: model.lastName,

      // user
      phone: model.phone.substring(1, model.phone.length),
      gender: model.gender,
      email: model.email,
      cardId: model.cardId,
      insuranceCardNumber: model.insuranceCardNumber
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof PatientsDialogFormComponent
   */
  openDeleteDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    const name =
      this.patientForm.value.firstName + " " + this.patientForm.value.lastName;

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id,
      title: "bệnh nhân " + name
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == id) {
        this.patientService.deleteById(data).subscribe(
          data => {
            this.openSnackBar("Đã xóa thành công", "Bệnh nhân");
            this.close();
          },
          error => this.openSnackBar("Có lỗi xảy ra", "Bệnh nhân")
        );
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof PatientsDialogFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
