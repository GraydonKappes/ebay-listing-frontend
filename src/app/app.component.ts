import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  generateDescription() {
    this.http.post<{ description: string }>('/api/generate-description', { title: this.productTitle })
      .subscribe(response => {
        this.generatedDescription = response.description;
        this.loadListings();
      }, error => {
        console.error('Error generating description:', error);
      });
  }

  loadListings() {
    this.http.get('/api/listings')
      .subscribe((response: any) => {
        this.listings = response;
      });
  }
}
