import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: { [key: string]: HttpResponse<any> } = {};

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'GET') {
      const cachedResponse = this.cache[request.url];

      if (cachedResponse) {
        return of(cachedResponse); 
      }
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache[request.url] = event;
        }
      })
    );
  }
}
