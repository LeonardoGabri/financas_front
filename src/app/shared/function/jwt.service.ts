import { PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  storeAuth$ = new Subscription

  constructor(
    private router: Router,
    private poNotification: PoNotificationService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('auth/login')) {
        let token = localStorage.getItem('token');

        if (token && token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403 || error.status === 401){
          this.poNotification.error("Token Expirado")
          this.router.navigate(['/login'])
        }
        return throwError(error);
      })
    );
  }
}
