/**
 * 描述
 * @date 2019-12-01
 * @param {any} "DoctorService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { Doctor } from "../model/doctor";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { Observable } from "rxjs";
import { HttpParams, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

const routes = {
  base: `${API.BASE}/doctors`
};

const log = new Logger("DoctorService");

@Injectable({
  providedIn: "root"
})
export class DoctorService implements Service<Doctor> {
  private handleError: HandleError;
  /**
   *Creates an instance of DoctorService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof DoctorService
   */
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError("CategoryService");
  }

  /**
   * @description
   * @param {HttpParams} params
   * @returns {Observable<Doctor[]>}
   * @memberof DoctorService
   */
  findAllWithParams(params: HttpParams): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(routes.base, { params })
      .pipe
      // tap(),
      // catchError(this.handleError("findAllByPaging", null))
      ();
  }

  /**
   * @description
   * @returns {Observable<Doctor[]>}
   * @memberof DoctorService
   */
  findAll(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(routes.base)
      .pipe
      // tap(),
      // catchError(this.handleError("findAll", null))
      ();
  }

  /**
   * @description
   * @returns {Observable<Doctor[]>}
   * @memberof DoctorService
   */
  findAllByDepartment(key: number): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(routes.base.concat("/department/").concat(key+''))
      .pipe
      // tap(),
      // catchError(this.handleError("findAll", null))
      ();
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<Doctor>}
   * @memberof DoctorService
   */
  findById(id: number): Observable<Doctor> {
    return this.http
      .get<Doctor>(routes.base + `/${id}`)
      .pipe
      // tap(item => log.debug("findById: " + JSON.stringify(item))),
      // catchError(this.handleError("findById", null))
      ();
  }

  /**
   * @description
   * @param {Doctor} dto
   * @returns {Observable<Doctor>}
   * @memberof DoctorService
   */
  save(dto: Doctor): Observable<Doctor> {
    return this.http
      .post<Doctor>(routes.base, dto)
      .pipe
      // tap(item => log.debug("saveDoctor: " + JSON.stringify(item))),
      // catchError(this.handleError("saveDoctor", null))
      ();
  }

  /**
   * @description
   * @param {Doctor} dto
   * @returns {Observable<Doctor>}
   * @memberof DoctorService
   */
  update(dto: Doctor): Observable<Doctor> {
    return this.http
      .put<Doctor>(routes.base, dto)
      .pipe
      // tap(item => log.debug("updateDoctor: " + JSON.stringify(item))),
      // catchError(this.handleError("updateDoctor", null))
      ();
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof DoctorService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Doctor>(`${routes.base}/${id}`).pipe();
  }

  /**
   * @description
   * @param {number} id
   * @param {Date} timeOfService
   * @returns {Observable<any>}
   * @memberof DoctorService
   */
  getFreeTimeOfService(
    id: number,
    timeOfService: Date,
    departmentId: number
  ): Observable<any> {
    return this.http
      .post<any>(`${routes.base}/freetime`, { id, timeOfService, departmentId })
      .pipe();
  }

  getFreeTimeOfServiceNotDoctor(
    id: number,
    timeOfService: Date,
    departmentId: number
  ): Observable<any> {
    return this.http
      .post<any>(`${routes.base}/freetimenot`, { id, timeOfService, departmentId })
      .pipe();
  }
}
