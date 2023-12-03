import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor extends HttpErrorResponse {
  constructor(private toastService: ToastrService) {
    super(toastService);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        this.toastService.error(httpErrorResponse.error, '', { closeButton: true });          
        return throwError(() => new Error(httpErrorResponse.message));
      })
    );
  }
}
