import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HistoricoService {

    private historicoUrl = 'api/equipos';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET heroes from the server */
    getEquipos(): Observable<any[]> {
        return this.http.get<any[]>(this.historicoUrl)
            .pipe(
                tap(_ => this.log('fetched equipos')),
                catchError(this.handleError<any[]>('getEquipos', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getEquipoById(id: String): Observable<any> {
        const url = `${this.historicoUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched equipo id=${id}`)),
            catchError(this.handleError<any>(`getEuipos id=${id}`))
        );
    }
    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addEquipo(equipo: any): Observable<any> {
        return this.http.post<any>(this.historicoUrl, equipo, this.httpOptions).pipe(
            tap((newEquipo: any) => this.log(`added equipo w/ id=${newEquipo.id}`)),
            catchError(this.handleError<any>('addEquipo'))
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