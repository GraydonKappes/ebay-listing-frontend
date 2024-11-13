package com.example.ebaylistingbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @PostMapping("/generate-description")
    public ResponseEntity<Map<String, String>> generateDescription(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String description = listingService.generateDescription(title);
        return ResponseEntity.ok(Map.of("description", description));
    }

    @GetMapping("/listings")
    public ResponseEntity<List<Listing>> getListings() {
        List<Listing> listings = listingService.getAllListings();
        return ResponseEntity.ok(listings);
    }
}
