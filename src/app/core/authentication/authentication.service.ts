/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { AuthService } from "ngx-auth";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map, switchMap, catchError } from "rxjs/operators";
import { TokenStorage } from "./token-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API, ROLE } from "./../../shared/config";
import { User } from "../domain/model/user";
import { AccountService } from "../domain/services/account.service";
import { NgxPermissionsService } from "ngx-permissions";

const jwtHelper = new JwtHelperService();

export interface AuthResponse {
  id_token: string;
}

export interface LoginContext {
  phone: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterContext {
  login: string;
  email: string;
  password: string;
}

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  auth: string;
  exp: number;
}

export enum StorageKeys {
  Token = "token",
  Authorities = "authorities"
}

const routes = {
  refreshToken: `${API.BASE}/refresh`,
  authenticate: `${API.BASE}/authenticate`,
  signUp: `${API.BASE}/register`,
  activate: (key: string) => `${API.BASE}/activate?key=${key}`,
  resendVerification: (email: string) =>
    `${API.BASE}/resend-email-verify?email=${email}`,
  requestReset: `${API.BASE}/account/reset-password/init`,
  resetPassword: `${API.BASE}/account/reset-password/finish`
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService implements AuthService {
  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @param {any} privatehttp:HttpClient
   * @param {any} privatetokenStorage:TokenStorage
   * @param {any} privateaccountService:AccountService
   * @returns {any}
   */
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private accountService: AccountService,
    private permissionService: NgxPermissionsService
  ) {
    const savedAuthorities =
      sessionStorage.getItem(StorageKeys.Authorities) ||
      localStorage.getItem(StorageKeys.Authorities);

    if (savedAuthorities) {
      this.permissionService.loadPermissions(JSON.parse(savedAuthorities));
    } else {
      this.logout();
    }
  }
  token;
  user: User;

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map(token => !jwtHelper.isTokenExpired(token)));
  }

  // Check whether the token is expired and return
  // true or false
  // return !!token; (will return either true or false based on the token availability)
  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  public isAuthenticated(): boolean {
    this.token = this.tokenStorage.getToken();
    return !!this.token && jwtHelper.isTokenExpired(this.token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<AccessData> {
    return this.tokenStorage.getRefreshToken().pipe(
      switchMap((refreshToken: string) =>
        this.http.post(routes.refreshToken, { refreshToken })
      ),
      tap((tokens: AccessData) => this.saveAccessData(tokens, true)),
      catchError(err => {
        this.logout();

        return Observable.throw(err);
      })
    );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith("/refresh");
  }

  /**
   * EXTRA AUTH METHODS
   */

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @param {any} context:LoginContext
   * @returns {any}
   */
  public login(context: LoginContext): Observable<any> {
    return this.http.post<AuthResponse>(routes.authenticate, context).pipe(
      map<AuthResponse, AccessData>(res => ({
        accessToken: res.id_token,
        refreshToken: ""
      })),
      tap((tokens: AccessData) => {
        this.saveAccessData(tokens, context.rememberMe);
      })
    );
  }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  // public getCurrentUser(): any {
  //   this.accountService.getCurrentUserLogged().subscribe(res => {
  //     this.user = res;

  //     return this.user;
  //   });
  // }
  // /**
  //  * 描述
  //  * @author duannh
  //  * @date 2019-12-01
  //  * @returns {any}
  //  */

  // public getRoleCurrentUser(): any {
  //   this.accountService.getCurrentUserLogged().subscribe(res => {
  //     this.user = res;
  //     if (this.user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
  //       return ROLE.ADMIN;
  //     } else if (this.user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
  //       return ROLE.DOCTOR;
  //     } else if (this.user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
  //       return ROLE.NURSE;
  //     } else if (this.user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
  //       return ROLE.PATIENT;
  //     }
  //   });
  // }

  /**
   * Logout
   */
  public logout(): void {
    this.permissionService.flushPermissions();
    this.tokenStorage.clear();
  }

  /**
   * Register the user.
   * @param {RegisterContext} context The context parameters
   * @return {Observable<any>} Returns 201 if user has been created
   */
  register(context: RegisterContext): Observable<any> {
    return this.http.post(routes.signUp, context);
  }

  /**
   * resendVerificationEmail
   */
  resendVerificationEmail(email: string): Observable<any> {
    return this.http.get(routes.resendVerification(email));
  }

  /**
   * requestPasswordResetInit
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(routes.requestReset, email);
  }

  /**
   * resetPasswordWithNewPassword
   */
  resetPassword(newPassword: string): Observable<any> {
    return this.http.post(routes.resetPassword, newPassword);
  }

  /**
   * activateAccount
   */
  activate(key: string) {
    return this.http.get(routes.activate(key));
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData(
    { accessToken, refreshToken }: AccessData,
    rememberMe: boolean
  ) {
    const storage = localStorage;
    this.tokenStorage.setAccessToken(accessToken).setRefreshToken(refreshToken);
    const authorities = this.getAuthorities(accessToken);

    storage.setItem(StorageKeys.Token, accessToken);
    storage.setItem(StorageKeys.Authorities, JSON.stringify(authorities));

    this.permissionService.loadPermissions(authorities);
  }

  private getAuthorities(accessToken: any): any[] {
    const payload = accessToken.split(".")[1];
    const jwtPayload: JwtPayload = JSON.parse(atob(payload));

    return jwtPayload.auth.split(",");
  }
}
