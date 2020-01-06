import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpStatusConstant } from './constant/http-status-constant';

@Injectable()
export class ApiService {

  @Output() popup = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        map((res: Response) => this.handleSuccess(res)),
        catchError((error: any) => this.catchError(error))
      )
  }

  private handleSuccess(res: Response) {
    let response: any = res;
    if(response.error){
      throw res;
    } else {
      console.log('handleSuccess', res);
      return res;
    }
  }

  private catchError(error: any) {
    this.handleError(error);
    return error;
  }

  private handleError(error: any) {
    console.log('handleError', error);
    this.showErrorPopup(error)
  }

  showErrorPopup(error: any) : void {
    this.popup.emit(error);
  }
}