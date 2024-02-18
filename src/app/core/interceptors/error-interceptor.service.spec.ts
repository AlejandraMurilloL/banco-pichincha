import { TestBed } from "@angular/core/testing";
import { HttpErrorInterceptor } from "./error-interceptor.service";
import { ToastrService } from "ngx-toastr";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";
import { error403 } from "../const/mocks.const";

describe("ErrorInterceptor", () => {
  let interceptor: HttpErrorInterceptor;
  let toastMock: Partial<ToastrService>;

  beforeEach(() => {
    toastMock = {
      error: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        { provide: ToastrService, useValue: toastMock },
      ],
    });

    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should call toastService if error response returned from api", (done) => {
    const toastSpy = jest.spyOn(toastMock, "error");
    const request = new HttpRequest("GET", "https://example.com");

    const next: HttpHandler = {
      handle: () => throwError(() => error403),
    };

    const intercepted = interceptor.intercept(request, next);
    intercepted.subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(error403.status);
        expect(err.statusText).toEqual(error403.statusText);
        expect(toastSpy).toHaveBeenCalled();
        done();
      },
    });
  });
});
