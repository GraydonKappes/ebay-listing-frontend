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

  constructor(private http: HttpClient) {}

  generateDescription() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const body = {
      model: "text-davinci-003",
      prompt: `Generate a product description for: ${this.productTitle}`,
      max_tokens: 100
    };

    this.http.post<any>('https://api.openai.com/v1/completions', body, { headers })
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
    this.http.get<Listing[]>('/api/listings')
      .subscribe(response => {
        this.listings = response;
      }, error => {
        console.error('Error loading listings:', error);
      });
  }
}
