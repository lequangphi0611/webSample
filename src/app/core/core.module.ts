/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[]
 * @param {any} imports:[CommonModule
 * @param {any} AuthenticationModule]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { AuthenticationModule } from "./authentication/authentication.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { HttpCacheService } from "./http/http-cache.service";
import { ApiPrefixInterceptor } from "./http/api-prefix.interceptor";
import { AuthorizationHeaderInterceptor } from "./http/authorization-header.interceptor";
import { ErrorHandlerInterceptor } from "./http/error-handle.interceptor";
import { CacheInterceptor } from "./http/cache.interceptor";
import { HttpService } from "./http/http.service";
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationModule, NgxPermissionsModule.forChild()]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...AuthenticationModule.forRoot().providers,
        HttpCacheService,
        ApiPrefixInterceptor,
        AuthorizationHeaderInterceptor,
        ErrorHandlerInterceptor,
        CacheInterceptor,
        {
          provide: HttpClient,
          useClass: HttpService
        }
      ]
    };
  }
}
