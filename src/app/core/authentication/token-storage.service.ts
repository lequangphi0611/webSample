/**
 * 描述
 * @date 2019-12-01
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class TokenStorage {
  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem("accessToken");
    return of(token);
  }

  /**
   * 描述
   * @date 2019-12-01
   * @returns {any}
   */
  public getToken(): string {
    const token: string = <string>localStorage.getItem("accessToken");
    return token;
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem("refreshToken");
    return of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem("accessToken", token);

    return this;
  }

  /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem("refreshToken", token);

    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
