import { Component } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingFormComponent } from './components/listing-form/listing-form.component';
import { ListingListComponent } from './components/listing-list/listing-list.component';

export interface Listing {
  title: string;
  description: string;
  productId: string;
  createDate: string;
  updateDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(private http: HttpClient) {}

  generateDescription(title: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const body = {
      model: "text-davinci-003",
      prompt: `Generate a product description for: ${title}`,
      max_tokens: 100
    };

    return this.http.post<any>('https://api.openai.com/v1/completions', body, { headers });
  }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ListingFormComponent,
    ListingListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ebay-listing-frontend';
  productTitle = '';
  generatedDescription = '';
  listings: Listing[] = [];
  isLoading = false;

  constructor(private listingService: ListingService) {}

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

  handleDescriptionGenerated(description: string) {
    this.generatedDescription = description;
    this.loadListings();
  }
}
