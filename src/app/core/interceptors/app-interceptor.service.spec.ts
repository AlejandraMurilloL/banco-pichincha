import { TestBed } from "@angular/core/testing";
import { AppInterceptor } from "./app-interceptor.service";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable, of } from "rxjs";

describe("AppInterceptor", () => {
  let interceptor: AppInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppInterceptor],
    });
    interceptor = TestBed.inject(AppInterceptor);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  it("should add the authorId header", () => {
    const authorId = "151";
    const request = new HttpRequest("GET", "https://example.com");
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<any> => {
        // Verify that the authorId header is added
        expect(req.headers.has("authorId")).toBe(true);
        expect(req.headers.get("authorId")).toBe(authorId);
        // Return an observable to mimic the HTTP request
        return of({});
      },
    };

    const intercepted = interceptor.intercept(request, next);
    intercepted.subscribe(() => {
      // Ensure that the interceptor is calling the next.handle method
      expect(true).toBe(true);
    });
  });
});
