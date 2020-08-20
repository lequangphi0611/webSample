/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-nurses-dialog-form"
 * @param {any} templateUrl:"./nurses-dialog-form.component.html"
 * @param {any} styleUrls:["./nurses-dialog-form.component.scss"]}
 * @returns {any}
 */
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Department } from "app/core/domain/model/department";
import { Nurse } from "app/core/domain/model/nurse";
import { DepartmentService } from "app/core/domain/services/department.service";
import { NurseService } from "app/core/domain/services/nurse.service";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { map, filter, debounceTime, switchMap } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { UserService } from "app/core/domain/services/user.service";

interface Gender {
  id: number;
  value: string;
}

@Component({
  selector: "app-nurses-dialog-form",
  templateUrl: "./nurses-dialog-form.component.html",
  styleUrls: ["./nurses-dialog-form.component.scss"]
})
export class NursesDialogFormComponent implements OnInit, AfterViewInit {
  @ViewChild("emailInput", { static: true }) emailInput: ElementRef;
  @ViewChild("phoneInput", { static: true }) phoneInput: ElementRef;

  public nurseForm: FormGroup;
  public nurse: Nurse;
  public id: number;
  public departments: Department[];
  public genders: Gender[] = [
    { id: 0, value: "Chọn giới tính" },
    { id: 1, value: "Nam" },
    { id: 2, value: "Nữ" },
    { id: 3, value: "Khác" }
  ];

  /**
   *Creates an instance of NursesDialogFormComponent.
   * @param {FormBuilder} fb
   * @param {MatDialog} dialog
   * @param {MatDialogRef<NursesDialogFormComponent>} dialogRef
   * @param {*} data
   * @param {NurseService} nursesService
   * @param {DepartmentService} departmentService
   * @param {MatSnackBar} snackBar
   * @memberof NursesDialogFormComponent
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<NursesDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private nursesService: NurseService,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.id = data.id;
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDepartments();
    this.getDataById();
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  ngAfterViewInit(): void {
    fromEvent<any>(this.emailInput.nativeElement, "input")
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        switchMap(email => this.userService.existsByEmail(email)),
        filter(exists => exists)
      )
      .subscribe(exists => {
        const errors = {
          existsEmail: exists
        };
        this.emailControl.setErrors(errors);
      });

    fromEvent<any>(this.phoneInput.nativeElement, "input")
      .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        switchMap(phone => this.userService.existsByPhone("0" + phone)),
        filter(exists => exists)
      )
      .subscribe(exists => {
        const errors = {
          existsPhone: exists
        };
        this.phoneControl.setErrors(errors);
      });
  }

  getDepartments() {
    this.departmentService.findAll().subscribe(res => {
      this.departments = res;
    });
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  getDataById = () => {
    const id = this.id;

    if (id != 0) {
      this.nursesService.findById(id).subscribe(res => {
        this.nurse = res;
        this.patchValue(this.nurse);
      });
    }
  };

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  buildForm() {
    this.nurseForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      function: ["", [Validators.required]],
      email: [""],
      phone: [
        {
          value: "",
          disabled: this.id ? true : false
        },
        [Validators.required, Validators.minLength(7), Validators.maxLength(12)]
      ],
      id: [""],
      departmentId: [0, Validators.minLength(1)],
      gender: [this.genders[0].id],
      address: [""],
      userId: [""]
    });
  }
  /**
   * @description
   * @readonly
   * @memberof NursesDialogFormComponent
   */
  get emailControl() {
    return this.nurseForm.get("email");
  }

  /**
   * @description
   * @readonly
   * @memberof NursesDialogFormComponent
   */
  get phoneControl() {
    return this.nurseForm.get("phone");
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  save() {
    this.dialogRef.close(this.nurseForm.value);
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * @description
   * @memberof NursesDialogFormComponent
   */
  patchValue = (model: Nurse) => {
    this.nurseForm.patchValue({
      firstName: model.firstName,
      id: model.id,
      userId: model.userId,
      lastName: model.lastName,
      departmentId: model.departmentId,
      function: model.function,

      // user
      phone: model.phone.substring(1, model.phone.length),
      gender: model.gender,
      email: model.email,
      address: model.address
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof NursesDialogFormComponent
   */
  openDeleteDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    const name =
      this.nurseForm.value.firstName + " " + this.nurseForm.value.lastName;

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id,
      title: "y tá " + name
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == id) {
        this.nursesService.deleteById(data).subscribe(
          data => {
            this.openSnackBar("Đã xóa thành công", "Y tá");
            this.close();
          },
          error => this.openSnackBar("Có lỗi xảy ra", "Y tá")
        );
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof NursesDialogFormComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
