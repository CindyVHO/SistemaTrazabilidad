import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RegistroMantenimientoService {

    private registroMantenimientoUrl = 'api/mantenimientos';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET heroes from the server */
    getMantenimientos(): Observable<any[]> {
        return this.http.get<any[]>(this.registroMantenimientoUrl)
            .pipe(
                tap(_ => this.log('fetched mantenimientos')),
                catchError(this.handleError<any[]>('getMantenimientos', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getMantenimientoById(id: String): Observable<any> {
        const url = `${this.registroMantenimientoUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched mantenimiento id=${id}`)),
            catchError(this.handleError<any>(`getmantenimiento id=${id}`))
        );
    }
    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addMantenimiento(mantenimiento: any): Observable<any> {
        return this.http.post<any>(this.registroMantenimientoUrl, mantenimiento, this.httpOptions).pipe(
            tap((newMantenimiento: any) => this.log(`added mantenimiento w/ id=${newMantenimiento.id}`)),
            catchError(this.handleError<any>('addMantenimiento'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (mantenimiento: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(mantenimiento); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${mantenimiento.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}