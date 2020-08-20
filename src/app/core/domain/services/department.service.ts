/**
 * 描述
 * @date 2019-12-01
 * @param {any} "DepartmentService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { Department } from "../model/department";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

const routes = {
  base: `${API.BASE}/departments`
};

const log = new Logger("DepartmentService");

@Injectable({
  providedIn: "root"
})
export class DepartmentService implements Service<Department> {
  private handleError: HandleError;

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
  findAllWithParams(params: HttpParams): Observable<Department[]> {
    return this.http.get<Department[]>(routes.base, { params }).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  findAll(): Observable<Department[]> {
    return this.http.get<Department[]>(routes.base).pipe(
    );
  }
  
  /**
   * @description
   * @param {number} id
   * @returns {Observable<Department>}
   * @memberof DepartmentService
   */
  findById(id: number): Observable<Department> {
    return this.http.get<Department>(routes.base + `/${id}`).pipe(
    );
  }
  
  /**
   * @description
   * @param {Department} dto
   * @returns {Observable<Department>}
   * @memberof DepartmentService
   */
  save(dto: Department): Observable<Department> {
    return this.http.post<Department>(routes.base, dto).pipe(
    );
  }

  /**
   * @description
   * @param {Department} dto
   * @returns {Observable<Department>}
   * @memberof DepartmentService
   */
  update(dto: Department): Observable<Department> {
    return this.http.put<Department>(routes.base, dto).pipe(
    );
  }
  
  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof DepartmentService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Department>(`${routes.base}/${id}`).pipe();
  }
}
