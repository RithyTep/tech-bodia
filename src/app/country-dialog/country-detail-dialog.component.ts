import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ICountry } from '../interfaces/country.interface';

@Component({
  selector: 'app-country-detail-dialog',
  templateUrl: './country-detail-dialog.component.html',
  styleUrls: ['./country-detail-dialog.component.scss'],
})
export class CountryDetailDialogComponent {
  item: ICountry;
  constructor(
    public dialogRef: MatDialogRef<CountryDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICountry
  ) {
    console.log(data);
    this.item = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
