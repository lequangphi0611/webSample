/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-patients-list"
 * @param {any} templateUrl:"./patients-list.component.html"
 * @param {any} styleUrls:["./patients-list.component.scss"]}
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
import { Patient } from "app/core/domain/model/patient";
import { PatientService } from "app/core/domain/services/patient.service";
import { DeleteDialogComponent } from "app/shared/delete-dialog/delete-dialog.component";
import { PatientsDialogFormComponent } from "../patients-dialog-form/patients-dialog-form.component";

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.scss"]
})
export class PatientsListComponent implements OnInit {
  public isLoaded: boolean = false;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public displayedColumns: string[] = [
    "index",
    "name",
    "phone",
    "cardId",
    "gender",
    "actions"
  ];
  public dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of PatientsListComponent.
   * @param {MatDialog} dialog
   * @param {PatientService} patientService
   * @param {MatSnackBar} snackBar
   * @memberof PatientsListComponent
   */
  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description
   * @param {*} e
   * @memberof PatientsListComponent
   */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  /**
   * @description
   * @memberof PatientsListComponent
   */
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /**
   * @description
   * @memberof PatientsListComponent
   */
  ngOnInit() {
    this.getAllPatients();
  }

  /**
   * @description
   * @memberof PatientsListComponent
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @description
   * @private
   * @memberof PatientsListComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @private
   * @memberof PatientsListComponent
   */
  private getAllPatients = () => {
    this.patientService.findAll().subscribe(response => {
      this.isLoaded = true;
      if (response != null) {
        this.dataSource.data = response as Patient[];
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      }
    });
  };

  /**
   * @description
   * @private
   * @param {number} id
   * @memberof PatientsListComponent
   */
  private toForm(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id: id,
      title: "bệnh nhân " + name
    };

    const dialogRef = this.dialog.open(
      PatientsDialogFormComponent,
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
        this.getAllPatients();
      }
    });
  }

  /**
   * @description
   * @private
   * @param {number} id
   * @param {string} name
   * @memberof PatientsListComponent
   */
  private openDeleteDialog(id: number, name: string) {
    const dialogConfig = new MatDialogConfig();

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
            this.getAllPatients();
            this.openSnackBar("Đã xóa thành công", "Bệnh nhân");
          },
          error => console.log(error)
        );
      }
    });
  }

  /**
   * @description
   * @private
   * @param {string} message
   * @param {string} action
   * @memberof PatientsListComponent
   */
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /**
   * @description
   * @private
   * @param {Patient} model
   * @memberof PatientsListComponent
   */
  private processSave(model: Patient) {
    this.patientService.save(model).subscribe(
      res => {
        this.openSnackBar("Thêm mới thành công", "Bệnh nhân");
        this.getAllPatients();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Bệnh nhân")
    );
  }

  /**
   * @description
   * @private
   * @param {Patient} model
   * @memberof PatientsListComponent
   */
  private processUpdate(model: Patient) {
    this.patientService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Bệnh nhân");
        this.getAllPatients();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Bệnh nhân")
    );
  }
}
