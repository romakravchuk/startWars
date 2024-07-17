import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './httpCache.service';

export function cacheInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const cacheService = inject(HttpCacheService);

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cacheService.get(req.urlWithParams);

  if (cachedResponse) {
    return of(new HttpResponse({ status: 200, body: cachedResponse }));
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheService.put(req.url, event.body);
      }
    })
  );
}

