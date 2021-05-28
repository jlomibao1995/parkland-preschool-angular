import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthenticationService, private _router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403) {
                // auto logout if 403 response returned from api
                this._authenticationService.logout();
                this._router.navigateByUrl('/login');
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}