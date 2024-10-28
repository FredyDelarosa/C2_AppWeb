import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorStorageService } from './error-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorStorageService: ErrorStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Error ${error.status}: ${error.message}`;
        this.errorStorageService.addError(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
