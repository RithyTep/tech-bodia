import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  country: any[] = [];
  currentPage = 1;
  itemsPerPage = 25;
  totalPages: number[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.fetchCountry().subscribe((data: any) => {
      this.country = data;
      console.log(this.country, 'wtfs');
      this.calculateTotalPages();
    });
  }

  get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.country.slice(startIndex, endIndex);
  }

  calculateTotalPages() {
    const totalItems = this.country.length;
    this.totalPages = Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
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
}
