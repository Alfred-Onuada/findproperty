import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IAgent } from "../../interfaces/agent";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SellerService{

  private baseApiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSellerById(id: string): Observable<IAgent> {
    return this.http.get<IAgent>(this.baseApiUrl + `/seller?id=${id}`)
      .pipe(
        catchError(this.handleError)
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