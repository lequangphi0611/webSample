/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-departments-dialog"
 * @param {any} templateUrl:"./departments-dialog.component.html"
 * @param {any} styleUrls:["./departments-dialog.component.scss"]}
 * @returns {any}
 */
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Department } from "app/core/domain/model/department";
import { DepartmentService } from "app/core/domain/services/department.service";

@Component({
  selector: "app-departments-dialog",
  templateUrl: "./departments-dialog.component.html",
  styleUrls: ["./departments-dialog.component.scss"]
})
export class DepartmentsDialogComponent implements OnInit {
  public departmentForm: FormGroup;
  public department: Department;
  public id: number;

  /**
   *Creates an instance of DepartmentsDialogComponent.
   * @param {FormBuilder} fb
   * @param {MatDialogRef<DepartmentsDialogComponent>} dialogRef
   * @param {*} data
   * @param {DepartmentService} departmentService
   * @memberof DepartmentsDialogComponent
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private departmentService: DepartmentService
  ) {
    this.id = data.id;
  }

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  ngOnInit() {
    this.buildForm();
    this.getDataById();
  }

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  getDataById = () => {
    const id = this.id;

    if (id != 0) {
      this.departmentService.findById(id).subscribe(res => {
        this.department = res;
        this.patchValue(this.department);
      });
    }
  };

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  buildForm() {
    this.departmentForm = this.fb.group({
      id: [""],
      name: ["", [Validators.required]],
      introduction: ["", [Validators.required]],
      note: [""]
    });
  }

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  save() {
    this.dialogRef.close(this.departmentForm.value);
  }

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * @description
   * @memberof DepartmentsDialogComponent
   */
  patchValue = (model: Department) => {
    this.departmentForm.patchValue({
      id: model.id,
      name: model.name,
      note: model.note,
      introduction: model.introduction
    });
  };
}
