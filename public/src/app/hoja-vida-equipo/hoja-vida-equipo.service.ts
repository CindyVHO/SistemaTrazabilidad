import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HojaVidaService {

    private hojaVidaUrl = 'api/hoja-vida';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET heroes from the server */
    getHojaVidas(): Observable<any[]> {
        return this.http.get<any[]>(this.hojaVidaUrl)
            .pipe(
                tap(_ => this.log('fetched hojaVida')),
                catchError(this.handleError<any[]>('getHojaVida', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getHojaVidaById(id: String): Observable<any> {
        const url = `${this.hojaVidaUrl}/${id}`;
        return this.http.get<any>(url).pipe(
            tap(_ => this.log(`fetched hojaVida id=${id}`)),
            catchError(this.handleError<any>(`getHojaVida id=${id}`))
        );
    }
    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addHojaVida(hojaVida: any): Observable<any> {
        return this.http.post<any>(this.hojaVidaUrl, hojaVida, this.httpOptions).pipe(
            tap((newHojaVida: any) => this.log(`added hojaVida w/ id=${newHojaVida.id}`)),
            catchError(this.handleError<any>('addHojaVida'))
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