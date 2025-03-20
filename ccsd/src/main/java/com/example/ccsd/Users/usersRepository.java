package com.example.ccsd.Users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface usersRepository extends MongoRepository<users, String> {
 users findByEmail(String email);
// users findByEmailPassword(String email,String password);
}