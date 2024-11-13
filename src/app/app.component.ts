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

  constructor(private listingService: ListingService) {}

  generateDescription() {
    this.listingService.generateDescription(this.productTitle)
      .subscribe(response => {
        if (response && response.choices && response.choices.length > 0) {
          this.generatedDescription = response.choices[0].text.trim();
        } else {
          console.error('No description returned from OpenAI API');
        }
        this.loadListings();
      }, error => {
        console.error('Error generating description:', error);
      });
  }

  loadListings() {
    this.listingService.getListings()
      .subscribe(response => {
        this.listings = response;
      }, error => {
        console.error('Error loading listings:', error);
      });
  }

  handleDescriptionGenerated(description: string) {
    this.generatedDescription = description;
    this.loadListings();
  }
}
