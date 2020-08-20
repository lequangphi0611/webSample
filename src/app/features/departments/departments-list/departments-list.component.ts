/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-departments-list"
 * @param {any} templateUrl:"./departments-list.component.html"
 * @param {any} styleUrls:["./departments-list.component.scss"]}
 * @returns {any}
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { Department } from "app/core/domain/model/department";
import { DepartmentService } from "app/core/domain/services/department.service";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { DepartmentsDialogComponent } from "../departments-dialog/departments-dialog.component";

@Component({
  selector: "app-departments-list",
  templateUrl: "./departments-list.component.html",
  styleUrls: ["./departments-list.component.scss"]
})
export class DepartmentsListComponent implements OnInit {
  public isLoaded: boolean = false;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public displayedColumns: string[] = [
    "index",
    "name",
    "introduction",
    "note",
    "actions"
  ];
  public dataSource = new MatTableDataSource<Department>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of DepartmentsListComponent.
   * @param {MatDialog} dialog
   * @param {DepartmentService} departmentService
   * @param {MatSnackBar} snackBar
   * @memberof DepartmentsListComponent
   */
  constructor(
    private dialog: MatDialog,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description
   * @param {*} e
   * @memberof DepartmentsListComponent
   */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  /**
   * @description
   * @memberof DepartmentsListComponent
   */
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /**
   * @description
   * @memberof DepartmentsListComponent
   */
  ngOnInit() {
    this.getAllDepartments();
  }

  /**
   * @description
   * @memberof DepartmentsListComponent
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @description
   * @private
   * @memberof DepartmentsListComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @memberof DepartmentsListComponent
   */
  getAllDepartments = () => {
    this.departmentService.findAll().subscribe(response => {
      this.isLoaded = true;
      if (response != null) {
        this.dataSource.data = response as Department[];
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      }
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof DepartmentsListComponent
   */
  toForm(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id: id,
      title: "khoa " + name
    };

    const dialogRef = this.dialog.open(
      DepartmentsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        if (data.id) {
          this.processUpdate(data);
        } else {
          this.processSave(data);
        }
      } else {
        this.getAllDepartments();
      }
    });
  }

  /**
   * @description
   * @param {number} id
   * @param {string} name
   * @memberof DepartmentsListComponent
   */
  openDeleteDialog(id: number, name: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: id,
      title: "khoa " + name
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == id) {
        this.departmentService.deleteById(data).subscribe(
          data => {
            this.getAllDepartments();
            this.openSnackBar("Đã xóa thành công", "Khoa");
          },
          error => console.log(error)
        );
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof DepartmentsListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /**
   * @description
   * @param {Department} model
   * @memberof DepartmentsListComponent
   */
  processSave(model: Department) {
    this.departmentService.save(model).subscribe(
      res => {
        this.openSnackBar("Thêm mới thành công", "Khoa");
        this.getAllDepartments();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Khoa")
    );
  }

  /**
   * @description
   * @param {Department} model
   * @memberof DepartmentsListComponent
   */
  processUpdate(model: Department) {
    this.departmentService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Khoa");
        this.getAllDepartments();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Khoa")
    );
  }
}
