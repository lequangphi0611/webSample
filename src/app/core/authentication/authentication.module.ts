/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @param {any} authenticationService:AuthenticationService
 * @returns {any}
 */
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AuthModule, AUTH_SERVICE, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI } from "ngx-auth";
import { AuthenticationService } from "./authentication.service";
import { TokenStorage } from "./token-storage.service";

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [AuthModule],
  providers: [
    TokenStorage,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: "/" },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: "/auth/login" },
    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService],
      useFactory: factory
    }
  ],
  declarations: [],
  exports: []
})
export class AuthenticationModule {
  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        TokenStorage,
        AuthenticationService,
        { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: "/" },
        { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: "/auth/login" },
        {
          provide: AUTH_SERVICE,
          deps: [AuthenticationService],
          useFactory: factory
        }
      ]
    };
  }
}
