import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { UserAuthInfo } from "src/app/interfaces/userAuthInfo";


@Injectable({
  providedIn: 'root'
})
export class CheckAuthService{
  
  constructor() {}

  getCurrentLoggedInUser(): Observable<UserAuthInfo> {
    // in production this will be retrieving a token from the browser and then using that to find the id,
    // there may not be a user to return so handle that in the respective component
    
    let userInformation: UserAuthInfo = {
      id: "$2b$05$nMEm03YCTc6EU9INQN5Q.ObGc9PFIzRx2uF2Mbe5xa8rdTk86EPeG",
      role: 3
    };
    return of(userInformation);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorResponse = { status: 0, message: ''};

    if (error.error instanceof ErrorEvent) {
      // errors here are from the frontend maybe network disconnection, bad route etc.
      errorResponse = { status: error.status, message: error.statusText }
    } else {
      // errors here are from the backend
      errorResponse = { status: error.status, message: error.message }
    }
    
    console.log(error)
    return throwError(errorResponse);
  }
  
}