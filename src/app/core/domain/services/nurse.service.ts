/**
 * 描述
 * @date 2019-12-01
 * @param {any} "NurseService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { Nurse } from "../model/nurse";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { Observable } from "rxjs";
import { HttpParams, HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";

const routes = {
  base: `${API.BASE}/nurses`
};

const log = new Logger("NurseService");

@Injectable({
  providedIn: "root"
})
export class NurseService implements Service<Nurse> {
  private handleError: HandleError;

  /**
   *Creates an instance of NurseService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof NurseService
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
   * @returns {Observable<Nurse[]>}
   * @memberof NurseService
   */
  findAllWithParams(params: HttpParams): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(routes.base, { params }).pipe(
    );
  }

  /**
   * @description
   * @returns {Observable<Nurse[]>}
   * @memberof NurseService
   */
  findAll(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(routes.base).pipe(
    );
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<Nurse>}
   * @memberof NurseService
   */
  findById(id: number): Observable<Nurse> {
    return this.http.get<Nurse>(routes.base + `/${id}`).pipe(
    );
  }

  /**
   * @description
   * @param {Nurse} dto
   * @returns {Observable<Nurse>}
   * @memberof NurseService
   */
  save(dto: Nurse): Observable<Nurse> {
    return this.http.post<Nurse>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {Nurse} dto
   * @returns {Observable<Nurse>}
   * @memberof NurseService
   */
  update(dto: Nurse): Observable<Nurse> {
    return this.http.put<Nurse>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof NurseService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Nurse>(`${routes.base}/${id}`).pipe();
  }
}
