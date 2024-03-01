import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CountryStore {

  searchTerm: any;
  searchTermChanges: any;

  constructor() {}
}
