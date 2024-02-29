import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL =
    'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  fetchCountry() {
    return this.http.get(this.apiURL);
  }
}
