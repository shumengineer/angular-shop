import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, debounceTime, delay, Observable, throwError} from "rxjs";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private errorService: ErrorHandlerService) {
  }

  getProducts(): any {
    return this.http.get("https://dummyjson.com/products", {
      params: new HttpParams({
        fromObject: {limit: 10}
      })
    }).pipe(delay(100), catchError(this.errorHandler.bind(this)))
  }

  searchProductsByName(name: string): any {
    return this.http.get("https://dummyjson.com/products/search", {
      params: new HttpParams({
        fromObject: {q: name, limit: 10}
      })
    }).pipe(delay(200), catchError(this.errorHandler.bind(this)))
  }


  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.statusText);
    return throwError(() => error.message)
  }
}
