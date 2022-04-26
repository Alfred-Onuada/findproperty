import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { IBuyers } from "../../interfaces/buyers";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BuyerService{

  // this services will get the id it uses from the cookies but for now i'll stick with getting it from the url
  private baseApiUrl: string = environment.apiUrl + 'fake-data/buyers.json';

  constructor(private http: HttpClient) { }

  getBuyerById(id: string): Observable<IBuyers[]> {
    return this.http.get<IBuyers[]>(this.baseApiUrl)
      .pipe(
        map((buyers: IBuyers[]) => buyers.filter(
          (buyer: IBuyers) => buyer._id === id
        )),
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