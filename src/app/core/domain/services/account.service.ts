/**
 * 描述
 * @date 2019-12-01
 * @param {any} "AccountService"
 * @returns {any}
 */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Logger } from "app/core/logger.service";
import { Observable } from "rxjs";
import { API } from "../../../shared/config";
import { User } from "../model/user";
import { Service } from "./crud-service";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";

const routes = {
  base: `${API.BASE}/accounts`
};

const log = new Logger("AccountService");

@Injectable({
  providedIn: "root"
})
export class AccountService implements Service<Account> {
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
  findAllWithParams(params: HttpParams): Observable<Account[]> {
    return this.http
      .get<Account[]>(routes.base, { params })
      .pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(routes.base).pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  findById(id: number): Observable<Account> {
    return this.http.get<Account>(routes.base + `/${id}`).pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Account
   * @returns {any}
   */
  save(dto: Account): Observable<Account> {
    return this.http.post<Account>(routes.base, dto).pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Account
   * @returns {any}
   */
  update(dto: Account): Observable<Account> {
    return this.http.put<Account>(routes.base, dto).pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Account>(`${routes.base}/${id}`).pipe();
  }
  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */

  getCurrentUserLogged(): Observable<User> {
    return this.http.get<User>(routes.base).pipe();
  }
}
