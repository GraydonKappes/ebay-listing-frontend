import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listing } from '../../models/listing.interface';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="listings-container">
      <h2>Listings</h2>
      <div *ngFor="let listing of listings">
        <h3>{{listing.title}}</h3>
        <p>{{listing.description}}</p>
        <small>Created: {{listing.createDate}}</small>
      </div>
    </div>
  `
})
export class ListingListComponent {
  @Input() listings: Listing[] = [];
} 