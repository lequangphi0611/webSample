/**
 * 描述
 * @date 2019-12-01
 * @param {any} "UploadService"
 * @returns {any}
 */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { API } from "../../../shared/config";
import { tap, catchError } from "rxjs/operators";
import {
  HandleError,
  HttpErrorHandlerService
} from "./http-error-handle.service";
import { Logger } from "app/core/logger.service";

const routes = {
  base: `${API.BASE}/upload-avatar`,
  location: `${API.BASE}/upload`
};

const log = new Logger("UploadService");

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private handleError: HandleError;

  /**
   *Creates an instance of UploadService.
   * @param {HttpClient} http
   * @param {HttpErrorHandlerService} httpErrorHandler
   * @memberof UploadService
   */
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = httpErrorHandler.createHandleError("UploadService");
  }

  /**
   * @description
   * @param {*} file
   * @returns {Observable<any>}
   * @memberof UploadService
   */
  upload(file: any): Observable<any> {
    return this.http.post<any>(routes.base, file).pipe(
    );
  }

  /**
   * @description
   * @returns {Observable<any>}
   * @memberof UploadService
   */
  location(): Observable<any> {
    return this.http.get<any>(routes.location).pipe(
    );
  }

}
