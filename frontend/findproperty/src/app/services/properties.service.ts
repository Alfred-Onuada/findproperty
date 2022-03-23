import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { IProperties } from "../interfaces/properties";

@Injectable({
  providedIn: 'root'
})
export class PropertyService{

  baseApiUrl: string = 'assets/fake-data/properties.json';

  constructor(private http: HttpClient) { }

  getProperties(count: number, offset: number = 0): Observable<IProperties[]> {
    return this.http.get<IProperties[]>(this.baseApiUrl)
      .pipe(
        map((properties) => properties.slice(offset, offset + count)),
        catchError(this.handleError)
      )
  }

  getPropertiesBySellerId(id: string, currentPropertyId: string, count: number, offset: number = 0): Observable<IProperties[]> {
    return this.http.get<IProperties[]>(this.baseApiUrl)
      .pipe(
        map((properties) => properties.filter(
          (property) => (property.sellerId === id && property._id != currentPropertyId)
        ).slice(offset, offset + count)),
        catchError(this.handleError)
      )
  }

  getPropertyById(id: string): Observable<IProperties[]> {
    return this.http.get<IProperties[]>(this.baseApiUrl)
      .pipe(
        map((properties) => properties.filter(
          (property) => property._id === id
        )),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
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