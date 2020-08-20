import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("accessToken")
      || sessionStorage.getItem("accessToken");
    
    if (token) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`)
      });
    }

    // clone request and replace 'http://' with 'https://' at the same time
    const secureReq = request.clone({
      url: request.url.replace('https://', 'http://')
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(request);

    // return next.handle(secureReq);
  }

}
