package com.example.ebaylistingbackend;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;

@Service
public class ListingService {
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    
    @Value("${openai.api.key}")
    private String apiKey;

    public String generateDescription(String title) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // Add system message for better context
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of(
            "role", "system",
            "content", "You are a professional eBay listing writer. Create compelling, detailed product descriptions."
        ));
        messages.add(Map.of(
            "role", "user",
            "content", "Write a detailed eBay listing description for: " + title
        ));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response = restTemplate.postForObject(OPENAI_API_URL, request, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> choice = choices.get(0);
            Map<String, String> messageResponse = (Map<String, String>) choice.get("message");
            return messageResponse.get("content");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating description: " + e.getMessage();
        }
    }

    public List<Listing> getAllListings() {
        // Retrieve listings from the database
        return new ArrayList<>();
    }
}
