import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { IPropertyTransactions } from "../../interfaces/propertyTransactions";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppliedPorpertiesService{

  // this services will get the id it uses from the cookies but for now i'll stick with getting it from the url
  private baseApiUrl: string = environment.apiUrl + 'fake-data/appliedProperties.json';

  constructor(private http: HttpClient) { }

  getRecordById(id: string): Observable<IPropertyTransactions[]> {
    return this.http.get<IPropertyTransactions[]>(this.baseApiUrl)
      .pipe(
        map((records: IPropertyTransactions[]) => records.filter(
          (record: IPropertyTransactions) => record._id == id
        )),
        catchError(this.handleError)
      )
  }

  getRecordsBySellerId(id: string): Observable<IPropertyTransactions[]> {
    return this.http.get<IPropertyTransactions[]>(this.baseApiUrl)
      .pipe(
        map((records: IPropertyTransactions[]) => records.filter(
          (record: IPropertyTransactions) => record.sellerId == id
        )),
        catchError(this.handleError)
      )
  }

  getRecordsByBuyerId(id: string, count: number, offset: number = 0): Observable<{ data: IPropertyTransactions[], _totalLength: number }> {    
    return this.http.get<IPropertyTransactions[]>(this.baseApiUrl)
      .pipe(
        map((records: IPropertyTransactions[]) => {

          records = records.filter((record: IPropertyTransactions) => record.buyerId == id)

          // improves performance rather than making many trips to the database
          let _totalLength: number = records.length;
          
          return {
            _totalLength,
            data: records.slice(offset, offset + count)
          }
        }),
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