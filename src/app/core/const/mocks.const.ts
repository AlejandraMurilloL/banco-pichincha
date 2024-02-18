import { HttpErrorResponse } from "@angular/common/http";

export const error403: HttpErrorResponse = new HttpErrorResponse({
    error: "403 error",
    status: 403,
    statusText: "Forbidden",
});