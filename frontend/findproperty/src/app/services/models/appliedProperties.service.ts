import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IAppliedPropertiesOnDashBoard } from "src/app/interfaces/appledPropertiesOnDashboard";

@Injectable({
  providedIn: 'root'
})
export class AppliedPorpertiesService{

  // this services will get the id it uses from the cookies but for now i'll stick with getting it from the url
  private baseApiUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  getRecordsByBuyerId(buyerId: string, count: number, offset: number): Observable<IAppliedPropertiesOnDashBoard[]> {
    return this.http.get<IAppliedPropertiesOnDashBoard[]>(this.baseApiUrl + `/appliedProperties?buyerId=${buyerId}&required=${count}&skip=${offset}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
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