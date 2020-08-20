/**
 * 描述
 * @date 2019-12-01
 * @param {any} "AppointmentService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Appointment } from "../model/appointment";

const routes = {
  base: `${API.BASE}/appointments`
};

const log = new Logger("AppointmentService");

@Injectable({
  providedIn: "root"
})
export class AppointmentService implements Service<Appointment> {
  private handleError: HandleError;
  private appointmentInfo: Appointment;

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} this.appointmentInfo
   * @returns {any}
   */
  public stateAppointmentInfo: BehaviorSubject<any> = new BehaviorSubject(
    this.appointmentInfo
  );
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} privatehttp:HttpClient
   * @param {any} privatehttpErrorHandler:HttpErrorHandlerService
   * @returns {any}
   */
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError("CategoryService");
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} params:HttpParams
   * @returns {any}
   */
  findAllWithParams(params: HttpParams): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(routes.base, { params })
      .pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  findAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base).pipe();
  }

  findAllButTop10(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base.concat("/top10")).pipe();
  }

  findAllButTop10Patient(id: number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(routes.base.concat(`/top10/patient/${id}`))
      .pipe();
  }

  findAllButTop10Doctor(id: number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(routes.base.concat(`/top10/doctor/${id}`))
      .pipe();
  }

  /**
   * @description
   * @returns {Observable<Appointment[]>}
   * @memberof AppointmentService
   */
  getAllAppointmentsButRequest(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base.concat("/request")).pipe();
  }

  /**
   * @description
   * @returns {Observable<Appointment[]>}
   * @memberof AppointmentService
   */
  getAllAppointmentsButCancel(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base.concat("/cancel")).pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  getTasks(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base + "/tasks").pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  findById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(routes.base + `/${id}`).pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Appointment
   * @returns {any}
   */
  save(dto: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(routes.base, dto).pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Appointment
   * @returns {any}
   */
  update(dto: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(routes.base, dto).pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Appointment>(`${routes.base}/${id}`).pipe();
  }

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} value:Appointment
   * @returns {any}
   */
  public setStateAppointmentInfo(value: Appointment) {
    this.stateAppointmentInfo.next(value);
  }

  /**
   * @description
   * @param {Appointment} dto
   * @returns {Observable<Appointment>}
   * @memberof AppointmentService
   */
  approve(dto: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(routes.base + "/approve", dto).pipe();
  }

  /**
   * @description
   * @param {Appointment} dto
   * @returns {Observable<Appointment>}
   * @memberof AppointmentService
   */
  decline(dto: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(routes.base + "/decline", dto).pipe();
  }

  /**
   * @description
   * @param {Appointment} dto
   * @returns {Observable<Appointment>}
   * @memberof AppointmentService
   */
  cancel(dto: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(routes.base + "/cancel", dto).pipe();
  }

  /**
   * @description
   * @returns {Observable<Appointment[]>}
   * @memberof AppointmentService
   */
  findAllButFinish(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(routes.base.concat("/finished")).pipe();
  }
}
