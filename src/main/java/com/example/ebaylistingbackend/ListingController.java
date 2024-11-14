package com.example.ebaylistingbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @PostMapping(value = "/generate-description", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> generateDescription(@RequestBody Map<String, String> request) {
        try {
            String title = request.get("title");
            String description = listingService.generateDescription(title);
            return ResponseEntity.ok(Map.of("description", description));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/listings")
    public ResponseEntity<List<Listing>> getListings() {
        List<Listing> listings = listingService.getAllListings();
        return ResponseEntity.ok(listings);
    }
}
