import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../typings/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   USERLIST = 'https://reqres.in/api'

  constructor(private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post<Users>(this.USERLIST + '/users', data)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  userList():Observable<any> {
    return this.http.get<any>(this.USERLIST + '/users')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:any): Observable<any> {
    return this.http.delete<Users>(`${this.USERLIST}/users/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:any, data:any): Observable<Users> {
    return this.http.put<Users>(`${this.USERLIST}/users/${id}`, data)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
