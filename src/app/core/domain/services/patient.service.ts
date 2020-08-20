/**
 * 描述
 * @date 2019-12-01
 * @param {any} "PatientService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { Patient } from "../model/patient";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

const routes = {
  base: `${API.BASE}/patients`
};

const log = new Logger("PatientService");

@Injectable({
  providedIn: "root"
})
export class PatientService implements Service<Patient> {
  private handleError: HandleError;

  /**
   *Creates an instance of PatientService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof PatientService
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
   * @returns {Observable<Patient[]>}
   * @memberof PatientService
   */
  findAllWithParams(params: HttpParams): Observable<Patient[]> {
    return this.http.get<Patient[]>(routes.base, { params }).pipe(
    );
  }

  /**
   * @description
   * @returns {Observable<Patient[]>}
   * @memberof PatientService
   */
  findAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(routes.base).pipe(
    );
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<Patient>}
   * @memberof PatientService
   */
  findById(id: number): Observable<Patient> {
    return this.http.get<Patient>(routes.base + `/${id}`).pipe(
    );
  }

  /**
   * @description
   * @param {Patient} dto
   * @returns {Observable<Patient>}
   * @memberof PatientService
   */
  save(dto: Patient): Observable<Patient> {
    return this.http.post<Patient>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {Patient} dto
   * @returns {Observable<Patient>}
   * @memberof PatientService
   */
  update(dto: Patient): Observable<Patient> {
    return this.http.put<Patient>(routes.base, dto).pipe(
    );
  }
 
  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof PatientService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Patient>(`${routes.base}/${id}`).pipe();
  }
}
