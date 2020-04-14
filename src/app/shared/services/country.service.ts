import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../models/models';
import { Observable } from 'rxjs';
import { shareReplay, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    constructor(
        private http: HttpClient
    ) { }

    loadCountries(): Observable<Countries[]> {
        return this.http
            .get<Countries[]>("https://restcountries.eu/rest/v2/all")
            .pipe(
                shareReplay());
    }

}