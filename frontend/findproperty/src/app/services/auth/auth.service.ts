import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { UserAuthInfo } from "src/app/interfaces/userAuthInfo";
import { environment } from "src/environments/environment";
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  private baseApiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getCurrentLoggedInUser(): Observable<UserAuthInfo | null> {
    const sessionId = localStorage.getItem('session');

    if (sessionId == null) {
      return of(null);
    }

    return this.http.get<UserAuthInfo>(this.baseApiUrl + `/get_user?sessionId=${sessionId}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.baseApiUrl + '/login', {
      email,
      password
    }).pipe(
      map((sessionId: string) => {
        localStorage.setItem('session', sessionId);

        return sessionId;
      }),
      catchError(this.handleError)
    )
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthorizedUser(expectedRole: number): Observable<boolean> {
    return this.getCurrentLoggedInUser().pipe(
      switchMap((res: UserAuthInfo | null) => {

        if (res === null) {
          return of(false)
        }
  
        return of(res.role === expectedRole);
      })
    )

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