package com.example.ccsd.Gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Gallery")
public class galleryController {

    @Autowired
    private galleryService GalleryService;

    @GetMapping
    public List<gallery> getAllGallerys() {
        return GalleryService.getAllGallerys().stream()

                // return galleryList.stream()
                .map(gallery -> {
                    // Add Base64 encoded image to each
                    gallery.setImage64String(gallery.getImage64String());
                    return gallery;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<gallery> getGalleryById(@PathVariable String id) {
        return GalleryService.getGalleryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addGallery(
            @RequestParam("title") String title,
            @RequestParam("postSlug") String postSlug,
            @RequestParam("postShortDescription") String postShortDescription,
            @RequestParam("tag") String tag,
            @RequestParam("place") String place,
            @RequestParam("date") String date,
            @RequestParam("status") String status,
            @RequestParam("content") String content,
            @RequestParam("image") MultipartFile image) throws IOException {

        byte[] imageBytes = image.getBytes();

        gallery Gallery = new gallery();
        Gallery.setTitle(title);
        Gallery.setPostSlug(postSlug);
        Gallery.setPostShortDescription(postShortDescription);
        Gallery.setTag(tag);
        Gallery.setPlace(place);
        Gallery.setDate(date);
        Gallery.setStatus(status);
        Gallery.setImage(imageBytes);
        Gallery.setContent(content);

        gallery savedGallery = GalleryService.addGallery(Gallery);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("gallery", savedGallery);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<gallery> updateGallery(@PathVariable String id, @RequestBody gallery GalleryDetails) {
        gallery updatedGallery = GalleryService.updateGallery(id, GalleryDetails);
        if (updatedGallery != null) {
            return ResponseEntity.ok(updatedGallery);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        GalleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}
