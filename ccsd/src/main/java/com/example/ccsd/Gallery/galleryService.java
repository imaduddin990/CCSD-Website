package com.example.ccsd.Gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class galleryService {

    @Autowired
    private galleryRepository GalleryRepository;

    public List<gallery> getAllGallerys() {
        // List<gallery> galleryList =
        return GalleryRepository.findAll();

//        // Add Base64 encoded images to each gallery object
//        galleryList.forEach(gallery -> {
//            gallery.setImage64String(gallery.getImage64String());
//        });

        //  return galleryList;
    }

    public Optional<gallery> getGalleryById(String id) {
        return GalleryRepository.findById(id);
    }

    public gallery addGallery(gallery gallery) {
        return GalleryRepository.save(gallery);
    }

    public void deleteGallery(String id) {
        if (GalleryRepository.existsById(id)) {
            GalleryRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Gallery with ID " + id + " does not exist.");
        }
    }

    public gallery updateGallery(String id, gallery GalleryDetails) {
        Optional<gallery> existingGalleryOptional = GalleryRepository.findById(id);
        if (existingGalleryOptional.isPresent()) {
            gallery existingGallery = existingGalleryOptional.get();
            existingGallery.setTitle(GalleryDetails.getTitle());
            existingGallery.setPostSlug(GalleryDetails.getPostSlug());
            existingGallery.setPostShortDescription(GalleryDetails.getPostShortDescription());
            existingGallery.setTag(GalleryDetails.getTag());
            existingGallery.setPlace(GalleryDetails.getPlace());
            existingGallery.setDate(GalleryDetails.getDate());
            existingGallery.setStatus(GalleryDetails.getStatus());
            existingGallery.setContent(GalleryDetails.getContent());
            existingGallery.setImage(GalleryDetails.getImage());
            return GalleryRepository.save(existingGallery);
        }
        return null;
    }
}
