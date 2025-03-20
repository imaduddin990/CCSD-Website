package com.example.ccsd.Users;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class users {
    String id;
    String email;
    String password;
    String firstName;
    String lastName;
    String phoneNumber;
    String address;
    String role;
    String username;
    String dob;

    private byte[] imageBytes;  // The original image data (binary)
    private byte[] profPic;  // The original image data (binary)
    private String image64String;  // The Base64 encoded image as a string

    public users() {
    }
    public users(String firstName, String role, byte[] profPic) {
        this.firstName = firstName;
        this.role = role;
        this.profPic = profPic;
    }

    public byte[] getImageBytes() {
        return imageBytes;
    }

    public void setImageBytes(byte[] imageBytes) {
        this.imageBytes = imageBytes;
    }

    public String getImageAsBase64() {
        return image64String;
    }

    public void setImageStore64String(String image64String) {
        this.image64String = image64String;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public byte[] getProfPic() {
        return profPic;
    }

    public void setProfPic(byte[] profPic) {
        this.profPic = profPic;
    }
}