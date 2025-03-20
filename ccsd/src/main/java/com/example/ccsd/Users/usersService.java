package com.example.ccsd.Users;
import com.example.ccsd.Products.products;
import com.example.ccsd.Users.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class usersService {

    @Autowired
    private usersRepository usersRepository;

    public List<users> getAllUsers(){
        return usersRepository.findAll();
    }

    public users addUser(users user) {
        return usersRepository.save(user);
    }

    public Optional<users> getUserById(String userId) {
        // Assuming usersRepository is a JPA repository or similar
        return usersRepository.findById(userId);
    }
    public users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
//    public users getUserByEmailPassword(String email,String password) {
//        return usersRepository.findByEmailPassword(email,password);
//    }

    public List<users> findAll() {
        return usersRepository.findAll();
    }

    public void deleteUser(String id) {
        // Check if the user exists
        Optional<users> existingUserOptional = usersRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            usersRepository.delete(existingUserOptional.get());  // Delete the user from the database
        }
    }

//    public void deleteUser(String id) {
//        // Check if the user exists
//        Optional<users> existingUserOptional = usersRepository.findById(id);
//
//        if (existingUserOptional.isPresent()) {
//            usersRepository.delete(existingUserOptional.get());  // Delete the user from the database
//        }
//    }

    public users updateUser(String id, users userDetails) {
        // Check if the user exists in the database
        Optional<users> existingUserOptional = usersRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            users existingUser = existingUserOptional.get();  // Fetch the existing user

            // Update the user fields
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setEmail(userDetails.getId());
            existingUser.setPassword(userDetails.getPassword());
            existingUser.setFirstName(userDetails.getFirstName());
            existingUser.setLastName(userDetails.getLastName());
            existingUser.setPhoneNumber(userDetails.getPhoneNumber());
            existingUser.setAddress(userDetails.getAddress());
            existingUser.setRole(userDetails.getRole());
            existingUser.setUsername(userDetails.getUsername());
            existingUser.setDob(userDetails.getDob());
            existingUser.setProfPic(userDetails.getProfPic());  // Update profile picture

            // Save and return the updated user
            return usersRepository.save(existingUser);
        }

        // If the user does not exist, return null
        return null;

    }

}