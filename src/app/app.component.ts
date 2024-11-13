import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ebay-listing-frontend';
  productTitle = '';
  generatedDescription = '';
  listings = [];

  constructor(private http: HttpClient) {}

  generateDescription() {
    this.http.post('/api/generate-description', { title: this.productTitle })
      .subscribe((response: any) => {
        this.generatedDescription = response.description;
        this.loadListings();
      });
  }

  loadListings() {
    this.http.get('/api/listings')
      .subscribe((response: any) => {
        this.listings = response;
      });
  }
}
