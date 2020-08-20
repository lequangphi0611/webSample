/**
 * 描述
 * @date 2019-12-01
 * @param {any} "MedicalHistoryService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { MedicalHistory } from "../model/medical-history";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

const routes = {
  base: `${API.BASE}/medical-histories`
};

const log = new Logger("MedicalHistoryService");

@Injectable({
  providedIn: "root"
})
export class MedicalHistoryService implements Service<MedicalHistory> {
  /**
   * @description
   * @private
   * @type {HandleError}
   * @memberof MedicalHistoryService
   */
  private handleError: HandleError;

  /**
   *Creates an instance of MedicalHistoryService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof MedicalHistoryService
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
   * @returns {Observable<MedicalHistory[]>}
   * @memberof MedicalHistoryService
   */
  findAllWithParams(params: HttpParams): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(routes.base, { params }).pipe(
    );
  }

  /**
   * @description
   * @returns {Observable<MedicalHistory[]>}
   * @memberof MedicalHistoryService
   */
  findAll(): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(routes.base).pipe(
    );
  }

  /**
   * @description
   * @returns {Observable<MedicalHistory[]>}
   * @memberof MedicalHistoryService
   */
  findAllButSuccess(): Observable<MedicalHistory[]> {
    return this.http.get<MedicalHistory[]>(`${API.BASE}/appointments/success`).pipe(
    );
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<MedicalHistory>}
   * @memberof MedicalHistoryService
   */
  findById(id: number): Observable<MedicalHistory> {
    return this.http.get<MedicalHistory>(routes.base + `/${id}`).pipe(
    );
  }

  /**
   * @description
   * @param {MedicalHistory} dto
   * @returns {Observable<MedicalHistory>}
   * @memberof MedicalHistoryService
   */
  save(dto: MedicalHistory): Observable<MedicalHistory> {
    return this.http.post<MedicalHistory>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {MedicalHistory} dto
   * @returns {Observable<MedicalHistory>}
   * @memberof MedicalHistoryService
   */
  update(dto: MedicalHistory): Observable<MedicalHistory> {
    return this.http.put<MedicalHistory>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof MedicalHistoryService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<MedicalHistory>(`${routes.base}/${id}`).pipe();
  }
}
