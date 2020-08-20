/**
 * 描述
 * @date 2019-12-01
 * @param {any} "NursesListComponent"
 * @returns {any}
 */
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Nurse } from "app/core/domain/model/nurse";
import { NurseService } from "app/core/domain/services/nurse.service";
import { UploadService } from "app/core/domain/services/upload.service";
import { Logger } from "app/core/logger.service";
import { NursesDialogFormComponent } from "../nurses-dialog-form/nurses-dialog-form.component";
export interface UploadContext {
  urlImage?: string;
  fileName?: string;
}

const log = new Logger("NursesListComponent");
@Component({
  selector: "app-nurses-list",
  templateUrl: "./nurses-list.component.html",
  styleUrls: ["./nurses-list.component.scss"]
})
export class NursesListComponent implements OnInit {
  public nurses: Nurse[];
  public urlAvatar: UploadContext;
  public isLoaded: boolean = false;

  /**
   *Creates an instance of NursesListComponent.
   * @param {MatDialog} dialog
   * @param {NurseService} nursesService
   * @param {UploadService} uploadService
   * @param {MatSnackBar} snackBar
   * @memberof NursesListComponent
   */
  constructor(
    private dialog: MatDialog,
    private nursesService: NurseService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @description
   * @memberof NursesListComponent
   */
  ngOnInit() {
    this.getAllNurses();
    // this.getUrlUpload();
  }

  // getUrlUpload = () => {
  //   this.uploadService.location().subscribe(
  //     res => {
  //       this.urlAvatar = res;
  //     },
  //     err => log.error("Error", err)
  //   );
  // };

  /**
   * @description
   * @memberof NursesListComponent
   */
  getAllNurses = () => {
    this.nursesService.findAll().subscribe(res => {
      this.nurses = res;
      this.isLoaded = true;
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof NursesListComponent
   */
  deleteNurses(id: number) {
    this.nursesService.deleteById(id).subscribe(
      data => {
        console.log(data);
        this.getAllNurses();
      },
      error => console.log(error)
    );
  }

  /**
   * @description
   * @param {number} id
   * @memberof NursesListComponent
   */
  toForm(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "55%";
    dialogConfig.data = {
      id: id,
      title: "y tá " + name
    };

    const dialogRef = this.dialog.open(NursesDialogFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        if (data.id) {
          this.processUpdate(data);
        } else {
          this.processSave(data);
        }
      } else {
        this.getAllNurses();
      }
    });
  }

  /**
   * @description
   * @param {Nurse} model
   * @memberof NursesListComponent
   */
  processSave(model: Nurse) {
    this.nursesService.save(model).subscribe(
      res => {
        this.openSnackBar("Thêm mới thành công", "Y tá");
        this.getAllNurses();
      },
      err => {
        this.openSnackBar("Có lỗi xảy ra", "Y tá");
      }
    );
  }

  /**
   * @description
   * @param {Nurse} model
   * @memberof NursesListComponent
   */
  processUpdate(model: Nurse) {
    this.nursesService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Y tá");
        this.getAllNurses();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Y tá")
    );
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof NursesListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
