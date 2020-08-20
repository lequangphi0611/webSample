/**
 * 描述
 * @date 2019-12-01
 * @param {any} "DoctorsListComponent"
 * @returns {any}
 */
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Doctor } from "app/core/domain/model/doctor";
import { DoctorService } from "app/core/domain/services/doctor.service";
import { UploadService } from "app/core/domain/services/upload.service";
import { Logger } from "app/core/logger.service";
import { DoctorsDialogFormComponent } from "../doctors-dialog-form/doctors-dialog-form.component";

export interface UploadContext {
  urlImage?: string;
  fileName?: string;
}

const log = new Logger("DoctorsListComponent");
@Component({
  selector: "app-doctors-list",
  templateUrl: "./doctors-list.component.html",
  styleUrls: ["./doctors-list.component.scss"]
})
export class DoctorsListComponent implements OnInit {
  public doctors: Doctor[];
  public urlAvatar: UploadContext;
  public isLoaded: boolean = false;

  /**
   *Creates an instance of DoctorsListComponent.
   * @param {MatDialog} dialog
   * @param {DoctorService} doctorService
   * @param {UploadService} uploadService
   * @param {MatSnackBar} snackBar
   * @memberof DoctorsListComponent
   */
  constructor(
    private dialog: MatDialog,
    private doctorService: DoctorService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description
   * @memberof DoctorsListComponent
   */
  ngOnInit() {
    this.getAllDoctors();
    this.getUrlUpload();
  }

  /**
   * @description
   * @memberof DoctorsListComponent
   */
  getUrlUpload = () => {
    this.uploadService.location().subscribe(
      res => {
        this.urlAvatar = res;
      },
      err => log.error("Error", err)
    );
  };

  /**
   * @description
   * @memberof DoctorsListComponent
   */
  getAllDoctors = () => {
    this.doctorService.findAll().subscribe(res => {
      this.doctors = res;
      this.isLoaded = true;
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof DoctorsListComponent
   */
  deleteDoctor(id: number) {
    // this.doctorService.deleteById(id).subscribe(
    //   data => {
    //     console.log(data);
    //     this.getAllDoctors();
    //   },
    //   error => console.log(error)
    // );
  }

  /**
   * @description
   * @param {number} id
   * @memberof DoctorsListComponent
   */
  toForm(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "55%";
    dialogConfig.data = {
      id: id,
      title: "bác sĩ " + name
    };

    const dialogRef = this.dialog.open(
      DoctorsDialogFormComponent,
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
        this.getAllDoctors();
      }
    });
  }

  /**
   * @description
   * @param {Doctor} model
   * @memberof DoctorsListComponent
   */
  processSave(model: Doctor) {
    this.doctorService.save(model).subscribe(
      res => {
        this.openSnackBar("Thêm mới thành công", "Bác sĩ");
        this.getAllDoctors();
      },
      err => {
        this.openSnackBar("Có lỗi xảy ra", "Bác sĩ");
      }
    );
  }

  /**
   * @description
   * @param {Doctor} model
   * @memberof DoctorsListComponent
   */
  processUpdate(model: Doctor) {
    this.doctorService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Bác sĩ");
        this.getAllDoctors();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Bác sĩ")
    );
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof DoctorsListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
