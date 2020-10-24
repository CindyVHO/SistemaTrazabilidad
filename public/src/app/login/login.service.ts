import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LoginService {

    private userUrl = 'api/users';  // URL to web api
    private rolUrl = 'api/rol';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET heroes from the server */
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.userUrl)
            .pipe(
                tap(_ => this.log('fetched users')),
                catchError(this.handleError<any[]>('getUsers', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getuserById(id: String): Observable<any> {
        const url = `${this.userUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError<any>(`getUser id=${id}`))
        );
    }
    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addUser(user: any): Observable<any> {
        return this.http.post<any>(this.userUrl, user, this.httpOptions).pipe(
            tap((newUser: any) => this.log(`added user w/ id=${newUser.id}`)),
            catchError(this.handleError<any>('addUser'))
        );
    }

    /** GET heroes from the server */
    getRoles(): Observable<any[]> {
        return this.http.get<any[]>(this.rolUrl)
            .pipe(
                tap(_ => this.log('fetched roles')),
                catchError(this.handleError<any[]>('getRoles', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getRolById(id: String): Observable<any> {
        const url = `${this.rolUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched rol id=${id}`)),
            catchError(this.handleError<any>(`getRol id=${id}`))
        );
    }
    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addRol(rol: any): Observable<any> {
        return this.http.post<any>(this.rolUrl, rol, this.httpOptions).pipe(
            tap((newRol: any) => this.log(`added rol w/ id=${newRol.id}`)),
            catchError(this.handleError<any>('addRol'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}