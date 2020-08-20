/**
 * 描述
 * @date 2019-12-01
 * @param {any} params:HttpParams
 * @returns {any}
 */
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Extend this entity for handling common CRUD api endpoints
 */
export interface Service<D> {
  
  /**
   * 描述
   * @date 2019-12-01
   * @param {any} params:HttpParams
   * @returns {any}
   */
  findAllWithParams(params: HttpParams): Observable<D[]>;

  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  findAll(): Observable<D[]>;

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  findById(id: number): Observable<D>;

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:D
   * @returns {any}
   */
  save(dto: D): Observable<D>;

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} dto:D
   * @returns {any}
   */
  update(dto: D): Observable<D>;

  /**
   * 描述
   * @date 2019-12-01
   * @param {any} id:number
   * @returns {any}
   */
  deleteById(id: number): Observable<any>;
}
