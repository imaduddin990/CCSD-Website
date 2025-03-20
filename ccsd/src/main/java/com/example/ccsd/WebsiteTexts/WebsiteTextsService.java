package com.example.ccsd.WebsiteTexts;
import com.example.ccsd.WebsiteImages.WebsiteImages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class WebsiteTextsService {
//getAllText
    //getTextById
    //addText
    //updateText
    //deleteText

    @Autowired
    private WebsiteTextsRepository websiteTextsRepository;

    //private static List<WebsiteTexts> websiteTextsList=new ArrayList<>();

    //get all text
    public List<WebsiteTexts> getAllText(){

        return websiteTextsRepository.findAll();
    }

    //get a single text id
    public Optional<WebsiteTexts>getTextById(String id){
        return websiteTextsRepository.findById(id);

    }

    public WebsiteTexts addText(WebsiteTexts websiteTexts){
       return websiteTextsRepository.save(websiteTexts);

    }

//    public void deleteText(String id){
//        if(websiteTextsRepository.existsById(id)){
//            websiteTextsRepository.deleteById(id);
//        }else{
//            throw new IllegalArgumentException("does not exist");
//        }
//    }

    public WebsiteTexts updateText(String id, WebsiteTexts textsDetails){
        // try to find the existing text by its ID

        return websiteTextsRepository.findById(id)
                .map(existingText -> {
                    //update fields selectively
                    existingText.setPostShortDescription(textsDetails.getPostShortDescription());
                    existingText.setStatus(textsDetails.getStatus());
                    existingText.setPlace(textsDetails.getPlace());
                    existingText.setTitle(textsDetails.getTitle());

                    //save updated obj in database
                    return websiteTextsRepository.save(existingText);
                })
                .orElseThrow(()-> new RuntimeException("Website text with ID"+ id+"not found"));
    }

    public void deleteText(String id){
            websiteTextsRepository.deleteById(id);

        }
    }



