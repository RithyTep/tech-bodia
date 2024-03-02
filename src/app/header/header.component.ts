import { Component } from '@angular/core';
import { CountryStore } from '../Stores/country.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public store: CountryStore) {}
}
