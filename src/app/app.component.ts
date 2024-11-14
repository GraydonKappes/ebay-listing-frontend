import { Component } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Listing {
  title: string;
  description: string;
  productId: string;
  createDate: string;
  updateDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ebay-listing-frontend';
  productTitle = '';
  generatedDescription = '';
  listings: Listing[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  generateDescription() {
    if (!this.productTitle) {
      return;
    }

    this.isLoading = true;
    const body = {
      title: this.productTitle
    };

    this.http.post<{description: string}>('/api/generate-description', body)
      .subscribe({
        next: (response) => {
          this.generatedDescription = response.description;
          this.isLoading = false;
          this.loadListings();
        },
        error: (error) => {
          console.error('Error generating description:', error);
          this.generatedDescription = 'Error generating description. Please try again.';
          this.isLoading = false;
        }
      });
  }

  loadListings() {
    this.http.get<Listing[]>('/api/listings')
      .subscribe({
        next: (response) => {
          this.listings = response;
        },
        error: (error) => {
          console.error('Error loading listings:', error);
        }
      });
  }
}
