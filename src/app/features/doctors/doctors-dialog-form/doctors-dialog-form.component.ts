/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-doctors-dialog-form"
 * @param {any} templateUrl:"./doctors-dialog-form.component.html"
 * @param {any} styleUrls:["./doctors-dialog-form.component.scss"]}
 * @returns {any}
 */
import { Component, Inject, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Department } from "app/core/domain/model/department";
import { Doctor } from "app/core/domain/model/doctor";
import { DepartmentService } from "app/core/domain/services/department.service";
import { DoctorService } from "app/core/domain/services/doctor.service";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { UploadFirebaseService } from "app/core/domain/services/uploadFirebaseService";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { Observable, fromEvent } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { UploadTaskSnapshot } from "@angular/fire/storage/interfaces";
import { UserService } from 'app/core/domain/services/user.service';
import { map, debounceTime, switchMap, filter } from 'rxjs/operators';

export interface Gender {
  id: number;
  value: string;
}

@Component({
  selector: "app-doctors-dialog-form",
  templateUrl: "./doctors-dialog-form.component.html",
  styleUrls: ["./doctors-dialog-form.component.scss"]
})
export class DoctorsDialogFormComponent implements OnInit {
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;
  @ViewChild('phoneInput', { static: true }) phoneInput: ElementRef;
  public doctorForm: FormGroup;
  public doctor: Doctor;
  public id: number;
  // public formAvatar: FormGroup;
  public file: any;
  // public urlAvatar: UploadContext;
  // public urlImages: string;
  public departments: Department[];
  public genders: Gender[] = [
    { id: 0, value: "Chọn giới tính" },
    { id: 1, value: "Nam" },
    { id: 2, value: "Nữ" },
    { id: 3, value: "Khác" }
  ];
  // Main task
  public task: AngularFireUploadTask;

  /**
   *Creates an instance of DoctorsDialogFormComponent.
   * @param {FormBuilder} fb
   * @param {MatDialog} dialog
   * @param {MatDialogRef<DoctorsDialogFormComponent>} dialogRef
   * @param {*} data
   * @param {DoctorService} doctorService
   * @param {DepartmentService} departmentService
   * @param {MatSnackBar} snackBar
   * @param {UploadFirebaseService} uploadFirebase
   * @param {AngularFireStorage} storage
   * @param {AngularFirestore} db
   * @memberof DoctorsDialogFormComponent
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DoctorsDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private uploadFirebase: UploadFirebaseService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private userService: UserService
  ) {
    this.id = data.id;
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDepartments();
    this.getDataById();
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
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
    return this.doctorForm.get('email');
  }
  get phoneControl() {
    return this.doctorForm.get('phone');
  }
  
  getDepartments() {
    this.departmentService.findAll().subscribe(res => {
      this.departments = res;
    });
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  getDataById = () => {
    const id = this.id;

    if (id != 0) {
      this.doctorService.findById(id).subscribe(res => {
        this.doctor = res;
        this.patchValue(this.doctor);
      });
    }
  };

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  buildForm() {
    this.doctorForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      function: ["", [Validators.required]],
      email: [""],
      phone: [
        {
          value: "",
          disabled: this.id ? true : false
        },
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(12)
        ]
      ],
      id: [""],
      departmentId: [0, Validators.minLength(1)],
      gender: [this.genders[0].id],
      address: [""],
      userId: [""]
    });

    // this.formAvatar = this.fb.group({
    //   avatar: [""]
    // });
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  save() {
    this.dialogRef.close(this.doctorForm.value);
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * @description
   * @param {*} event
   * @returns
   * @memberof DoctorsDialogFormComponent
   */
  onFileChange(event) {
    // The File object
    const file = event.target.files[0];

    if (file.type.split("/")[0] !== "image") {
      this.openSnackBar("Vui lòng chọn đúng định dạng ảnh", "Bác sĩ");
      return;
    }

    this.task = this.uploadFirebase.uploadFileDoctor(file);

    // The file's download URL
    this.task.task.then((res: UploadTaskSnapshot) => {
      res.task.then(res => {
        console.log(res.metadata.fullPath);
      });
      if (res.state == "success") {
        this.openSnackBar("Cập nhật ảnh thành công", "Bác sĩ");
      } else {
        this.openSnackBar("Có lỗi xảy ra, vui lòng thử lại", "Bác sĩ");
      }
    });
  }

  /**
   * @description
   * @memberof DoctorsDialogFormComponent
   */
  patchValue = (model: Doctor) => {
    this.doctorForm.patchValue({
      firstName: model.firstName,
      id: model.id,
      userId: model.userId,
      lastName: model.lastName,
      departmentId: model.departmentId,
      // bonus: model.bonus,
      // studying: model.studying,
      // experience: model.experience,
      // intro: model.intro,
      function: model.function,

      // user
      phone: model.phone.substring(1, model.phone.length),
      gender: model.gender,
      // imageUrl: model.imageUrl,
      email: model.email,
      // birthday: new DatePipe("en-US").transform(model.birthday, "yyyy-MM-dd"),
      address: model.address
    });

    // this.urlAvatar.fileName = model.imageUrl;

    // if (this.urlAvatar.fileName) {
    // this.urlImages = this.urlAvatar.urlImage + this.urlAvatar.fileName;
    // }
  };

  /**
   * @description
   * @param {number} id
   * @memberof DoctorsDialogFormComponent
   */
  openDeleteDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    const name =
      this.doctorForm.value.firstName + " " + this.doctorForm.value.lastName;

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id,
      title: "bác sĩ " + name
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == id) {
        this.doctorService.deleteById(data).subscribe(
          data => {
            this.openSnackBar("Đã xóa thành công", "Bác sĩ");
            this.close();
          },
          error => this.openSnackBar("Có lỗi xảy ra", "Bác sĩ")
        );
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof DoctorsDialogFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
