import { Component, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CountryDetailDialogComponent } from '../country-dialog/country-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CountryStore } from '../Stores/country.store';

@Component({
 selector: 'app-homepage',
 templateUrl: './homepage.component.html',
 styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
 country: any[] = [];
 currentPage = 1;
 totalPages: number[] = [];
 itemsPerPage: number = 25;

 constructor(
    private api: ApiService,
    public dialog: MatDialog,
    public store: CountryStore
 ) {}

 isMenuOpen = false;
 isLoading = false;

 ngOnInit() {
    this.loadCountries();
 }

 loadCountries() {
    this.isLoading = true;
    this.api.fetchCountry().subscribe((data: any) => {
      this.country = data;
      this.calculateTotalPages();
      this.isLoading = false;
    });
 }

 toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
 }

 get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCountries.slice(startIndex, endIndex);
 }

 calculateTotalPages() {
    this.totalPages = [
      ...Array(Math.ceil(this.filteredCountries.length / this.itemsPerPage)).keys(),
    ].map((i) => i + 1);
 }

 navigatePage(direction: 'next' | 'prev') {
    const totalPages = Math.ceil(this.filteredCountries.length / this.itemsPerPage);
    if (direction === 'next' && this.currentPage < totalPages) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
 }

 goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
 }

 get filteredCountries() {
    return this.store.searchTerm ? this.country.filter(item =>
      item.name.official.toLowerCase().includes(this.store.searchTerm.toLowerCase())
    ) : this.country;
 }

 get visiblePages() {
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages.length, start + 4);
    return this.totalPages.slice(start, end);
 }

 sortCountries(order: string) {
    this.isMenuOpen = false;
    this.country.sort((a, b) => {
      const nameA = a.name.official.toLowerCase();
      const nameB = b.name.official.toLowerCase();
      return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
 }

 openDialog(item: any) {
    this.dialog.open(CountryDetailDialogComponent, {
      width: '1400px',
      data: item,
    });
 }
}
