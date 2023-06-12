import { Observable, of } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    if (authService.isLoggedIn()) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });

      const reqCloned = this.handleBodyIn(
        tokenizedReq,
        authService.getCompanieId(),
        'idCompanie'
      );
      const copiedReq = reqCloned;
      return next.handle(copiedReq);
    }

    return next.handle(req).pipe(
      catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any
    );
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    // if (err.status === 500) {
    //   console.log('ASDASD');
    //   return of(err.message);
    // }
    throw err;
  }
  handleBodyIn(req: HttpRequest<any>, tokenToAdd, tokenName) {
    if (req.method.toLowerCase() === 'post') {
      if (req.body instanceof FormData) {
        req = req.clone({
          body: req.body.append(tokenName, tokenToAdd),
        });
      } else {
        const foo = {};
        foo[tokenName] = tokenToAdd;
        req = req.clone({
          body: { ...req.body, ...foo },
        });
      }
    }
    if (req.method.toLowerCase() === 'get') {
      req = req.clone({
        params: req.params.set(tokenName, tokenName),
      });
    }

    return req;
  }
}
