import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BuyerService{

  baseApiUrl: string = 'assets/fake-data/buyers.json';

  constructor(private http: HttpClient) { }
}