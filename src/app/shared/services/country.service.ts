import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../models/models';
import { Observable } from 'rxjs';
import { shareReplay, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    constructor(
        private http: HttpClient
    ) { }

    loadCountries(): Observable<Country[]> {
        return this.http
            .get<Country[]>("https://restcountries.eu/rest/v2/all")
            .pipe(
                shareReplay());
    }

}