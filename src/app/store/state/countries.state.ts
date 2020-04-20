import { Injectable } from "@angular/core";
import { Country } from '../../models/models';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCountries } from '../action/countries.action';
import { CountryService } from "../../shared/services/country.service";

export class CountryModel{
    countries: Country[];
}

@State<CountryModel>({
    name: 'countries',
    defaults: {
        countries: null
    }
})
@Injectable()
export class CountriesState {

    constructor(private countryService: CountryService){}

    @Selector()
    static countryExist(state: CountryModel) {
        return state.countries? true: false;
    }

    @Action(GetCountries)
    GetCountries(ctx: StateContext<CountryModel>) {
        if (ctx.getState().countries === null){
            this.countryService.loadCountries().subscribe( res => {
                if (res){
                    const countries = res;
                    ctx.setState({...ctx, countries});
                }
            });
        }
    }

}