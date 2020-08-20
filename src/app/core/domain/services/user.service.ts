/**
 * 描述
 * @date 2019-12-01
 * @param {any} "UserService"
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { API } from "app/shared/config";
import { Logger } from "app/core/logger.service";
import { Service } from "./crud-service";
import { User } from "../model/user";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

const routes = {
  base: `${API.BASE}/users`,
  account: `${API.BASE}/accounts`
};

const log = new Logger("UserService");

@Injectable({
  providedIn: "root"
})
export class UserService implements Service<User> {
  private handleError: HandleError;

  /**
   *Creates an instance of UserService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof UserService
   */
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError("CategoryService");
  }

  /**
   * @description
   * @param {string} email
   * @returns {Observable<boolean>}
   * @memberof UserService
   */
  existsByEmail(email: string): Observable<boolean> {
    if(!email || email === '') return of(true);

    return this.http
      .get<{ exists: boolean }>(`${routes.base}/email/${email}`)
      .pipe(map(v => v.exists));
  }

  /**
   * @description
   * @param {string} phone
   * @returns {Observable<boolean>}
   * @memberof UserService
   */
  existsByPhone(phone: string): Observable<boolean> {
    if(!phone || phone === '') return of(true);

    return this.http
      .get<{ exists: boolean }>(`${routes.base}/phone/${phone}`)
      .pipe(map(v => v.exists));
  }

  /**
   * @description
   * @param {HttpParams} params
   * @returns {Observable<User[]>}
   * @memberof UserService
   */
  findAllWithParams(params: HttpParams): Observable<User[]> {
    return this.http
      .get<User[]>(routes.base, { params })
      .pipe();
  }

  /**
   * @description
   * @param {string} email
   * @returns {Observable<void>}
   * @memberof UserService
   */
  recoverPassword(email: string): Observable<void> {
    return this.http.get<void>(`${routes.base}/recover`, {
      params: {
        email
      }
    });
  }

  /**
   * @description
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(routes.account);
  }

  /**
   * @description
   * @returns {Observable<User[]>}
   * @memberof UserService
   */
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(routes.base).pipe();
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<User>}
   * @memberof UserService
   */
  findById(id: number): Observable<User> {
    return this.http.get<User>(routes.base + `/${id}`).pipe();
  }

  /**
   * @description
   * @param {User} dto
   * @returns {Observable<User>}
   * @memberof UserService
   */
  save(dto: User): Observable<User> {
    return this.http.post<User>(routes.base, dto).pipe();
  }

  /**
   * @description
   * @param {User} dto
   * @returns {Observable<User>}
   * @memberof UserService
   */
  update(dto: User): Observable<User> {
    return this.http.put<User>(routes.base, dto).pipe();
  }

  /**
   * @description
   * @param {number} id
   * @returns {Observable<any>}
   * @memberof UserService
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<User>(`${routes.base}/${id}`).pipe();
  }
}
