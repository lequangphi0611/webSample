/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-medical-histories-list'
 * @param {any} templateUrl:'./medical-histories-list.component.html'
 * @param {any} styleUrls:['./medical-histories-list.component.scss']}
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
import { MedicalHistory } from "app/core/domain/model/medical-history";
import { MedicalHistoryService } from "app/core/domain/services/medical-history.service";
import { MedicalHistoriesDialogComponent } from "../medical-histories-dialog/medical-histories-dialog.component";
import { APPOINTMENT, ROLE } from "app/shared/config";
import { Route, Router } from "@angular/router";
import { User } from "app/core/domain/model/user";
import { AccountService } from "app/core/domain/services/account.service";

@Component({
  selector: "app-medical-histories-list",
  templateUrl: "./medical-histories-list.component.html",
  styleUrls: ["./medical-histories-list.component.scss"]
})
export class MedicalHistoriesListComponent implements OnInit {
  public isLoaded: boolean = false;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public user: User;
  public userLogged: User;
  public id: number = 0;
  public userRole: string;
  public isDisplay: number = 0;
  public displayedColumns: string[] = [
    "index",
    "appointmentCode",
    "timeOfService",
    "shift",
    "patient",
    "doctor",
    "departmentName",
    "actions"
  ];
  public dataSource = new MatTableDataSource<MedicalHistory>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /**
   *Creates an instance of MedicalHistoriesListComponent.
   * @param {MatDialog} dialog
   * @param {MedicalHistoryService} medicalHistoryService
   * @param {MatSnackBar} snackBar
   * @memberof MedicalHistoriesListComponent
   */
  constructor(
    private dialog: MatDialog,
    private medicalHistoryService: MedicalHistoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService
  ) {}

  /**
   * @description
   * @param {*} e
   * @memberof MedicalHistoriesListComponent
   */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  /**
   * @description
   * @memberof MedicalHistoriesListComponent
   */
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  /**
   * @description
   * @memberof MedicalHistoriesListComponent
   */
  ngOnInit() {
    this.getAllMedicalHistories();
    this.getCurrentUser();
  }

  /**
   * @description
   * @memberof MedicalHistoriesListComponent
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * @description
   * @private
   * @memberof MedicalHistoriesListComponent
   */
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource.data = part;
  }

  /**
   * @description
   * @memberof MedicalHistoriesListComponent
   */
  getAllMedicalHistories = () => {
    this.medicalHistoryService.findAll().subscribe(response => {
      this.isLoaded = true;
      this.dataSource.data = response as MedicalHistory[];
      this.array = response;
      this.totalSize = this.array.length;
      this.iterator();
    });
  };

  /**
   * @description
   * @param {number} id
   * @memberof MedicalHistoriesListComponent
   */
  toDetail(id: number) {
    this.router.navigate(["management/medical-history/detail/", id]);
  }

  /**
   * @description
   * @param {number} id
   * @memberof MedicalHistoriesListComponent
   */
  toForm(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      id: id,
      title: "lịch sử"
    };

    const dialogRef = this.dialog.open(
      MedicalHistoriesDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        if (data.id) {
          this.processUpdate(data);
        }
      } else {
        this.getAllMedicalHistories();
      }
    });
  }

  /**
   * @description
   * @param {string} message
   * @param {string} action
   * @memberof MedicalHistoriesListComponent
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /**
   * @description
   * @param {MedicalHistory} model
   * @memberof MedicalHistoriesListComponent
   */
  // processSave(model: MedicalHistory) {
  //   this.medicalHistoryService.save(model).subscribe(
  //     res => {
  //       this.openSnackBar("Thêm mới thành công", "Lịch sử khám");
  //       this.getAllMedicalHistories();
  //     },
  //     err => this.openSnackBar("Có lỗi xảy ra", "Lịch sử khám")
  //   );
  // }

  /**
   * @description
   * @param {MedicalHistory} model
   * @memberof MedicalHistoriesListComponent
   */
  processUpdate(model: MedicalHistory) {
    this.snackBar.open("Vui lòng đợi...", '', {
      duration: 3000
    });
    this.medicalHistoryService.update(model).subscribe(
      res => {
        this.openSnackBar("Cập nhật thành công", "Lịch sử khám");
        this.getAllMedicalHistories();
      },
      err => this.openSnackBar("Có lỗi xảy ra", "Lịch sử khám")
    );
  }

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

  millisToUTCDate = function(millis) {
    return this.toUTCDate(new Date(millis));
  };

  public filterShift(shift: number) {
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

  public getCurrentUser(): any {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.userLogged = res;

      this.userRole = this.filterRole(this.userLogged);

      if (this.userRole) {
        if (this.userRole === ROLE.ADMIN) {
          this.isDisplay = 1;
        } else if (this.userRole == ROLE.DOCTOR) {
          this.isDisplay = 2;
        } else if (this.userRole == ROLE.NURSE) {
          this.isDisplay = 3;
        } else if (this.userRole == ROLE.PATIENT) {
          this.isDisplay = 4;
        }
      }
    });
  }

  filterRole(user: User) {
    if (user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
      return ROLE.ADMIN;
    } else if (user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
      return ROLE.DOCTOR;
    } else if (user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
      return ROLE.NURSE;
    } else if (user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
      return ROLE.PATIENT;
    }
  }
}
