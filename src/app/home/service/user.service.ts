import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../typings/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERLIST = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  // Create api
  create(data:Users): Observable<Users> {
    return this.http.post<Users>(this.USERLIST + '/user', data)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // User List api
  userList():Observable<Users> {
    return this.http.get<Users>(this.USERLIST + '/user')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // Delete api
  delete(id:number): Observable<Users> {
    return this.http.delete<Users>(`${this.USERLIST}/user/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // Update api
  update(id:number, data:Users): Observable<Users> {
    return this.http.put<Users>(`${this.USERLIST}/user/${id}`, data)
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
