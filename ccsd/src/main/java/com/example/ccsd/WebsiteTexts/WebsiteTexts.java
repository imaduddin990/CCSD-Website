package com.example.ccsd.WebsiteTexts;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "websitetexts")
public class WebsiteTexts {

    private String id;
    private String postShortDescription;
    private String status;
    private String place;
    private String title;
    private String tag;

    public WebsiteTexts(String id, String postShortDescription, String status, String place, String title){
        this.id = id;
        this.postShortDescription = postShortDescription;
        this.status = status;
        this.place = place;
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostShortDescription() {
        return postShortDescription;
    }

    public void setPostShortDescription(String about) {

        this.postShortDescription = about;
    }

    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {

        this.status = status;
    }

    public String getPlace() {

        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getTitle() {

        return title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public String getTag() {

        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

}



