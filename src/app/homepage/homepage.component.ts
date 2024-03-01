import { Component, Input, SimpleChanges } from '@angular/core';
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
  constructor(private api: ApiService, public dialog: MatDialog, public store: CountryStore) {}
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.api.fetchCountry().subscribe((data: any) => {
      this.country = data;
      this.calculateTotalPages();
      this.isLoading = false;
    });
  }

  get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCountries.slice(startIndex, endIndex);
  }
  calculateTotalPages() {
    const totalItems = this.country.length;
    this.totalPages = Array(Math.ceil(totalItems / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  nextPage() {
    const totalPages = Math.ceil(this.country.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get filteredCountries() {
    if (this.store.searchTerm) {
      return this.country.filter((item) =>
        item.name.official.toLowerCase().includes(this.store.searchTerm.toLowerCase())
      );
    } else {
      return this.country;
    }
  }

  sortCountries(order: string) {
    this.isMenuOpen = false;
    this.country.sort((a, b) => {
      const nameA = a.name.official.toLowerCase();
      const nameB = b.name.official.toLowerCase();
  
      if (order === 'asc') {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
    });
  }
  openDialog(item: any) {
    const dialogRef = this.dialog.open(CountryDetailDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
