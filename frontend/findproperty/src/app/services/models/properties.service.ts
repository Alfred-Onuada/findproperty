import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { IProperties } from "../../interfaces/properties";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PropertyService{

  private baseApiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProperties(count: number, offset: number = 0): Observable<IProperties[]> {
    return this.http.get<IProperties[]>(this.baseApiUrl + `/properties?required=${count}&skip=${offset}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getPropertiesBySellerId(sellerId: string, currentPropertyId: string, count: number, offset: number = 0): Observable<IProperties[]> {
    return this.http.get<IProperties[]>(this.baseApiUrl + `/propertiesFromSeller?sellerId=${sellerId}&currentPropertyId=${currentPropertyId}&required=${count}&skip=${offset}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getPropertyById(id: string): Observable<IProperties> {
    return this.http.get<IProperties>(this.baseApiUrl + `/property?id=${id}`)
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