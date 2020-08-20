/**
 * 描述
 * @date 2019-12-01
 * @param {any} {providedIn:'root'}
 * @returns {any}
 */
import { Injectable } from '@angular/core';
import { Service } from './crud-service';
import { Authority } from '../model/authority';
import { HandleError, HttpErrorHandlerService } from './http-error-handle.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'app/shared/config';

const routes = {
  base: `${API.BASE}/roles`
};

@Injectable({
  providedIn: 'root'
})
export class AuthorityService implements Service<Authority> {
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
  findAllWithParams(params: HttpParams): Observable<Authority[]> {
    return this.http.get<Authority[]>(routes.base, { params }).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  findAll(): Observable<Authority[]> {
    return this.http.get<Authority[]>(routes.base).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  findById(id: number): Observable<Authority> {
    return this.http.get<Authority>(routes.base + `/${id}`).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Authority
   * @returns {any}
   */
  save(dto: Authority): Observable<Authority> {
    return this.http.post<Authority>(routes.base, dto).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:Authority
   * @returns {any}
   */
  update(dto: Authority): Observable<Authority> {
    return this.http.put<Authority>(routes.base, dto).pipe(
    );
  }
  
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  deleteById(id: number): Observable<any> {
    return this.http.delete<Authority>(`${routes.base}/${id}`).pipe();
  }
}
