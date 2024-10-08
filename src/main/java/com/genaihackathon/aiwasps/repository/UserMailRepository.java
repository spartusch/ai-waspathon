package com.genaihackathon.aiwasps.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.genaihackathon.aiwasps.model.UserMail;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.List;

@Repository
public class UserMailRepository {

    private final ObjectMapper mapper;
    private final List<UserMail> emails;

    public UserMailRepository(ObjectMapper mapper) {
        this.mapper = mapper;
        this.emails = getData();
    }

    private List<UserMail> getData() {
        try(InputStream in = this.getClass().getResourceAsStream("/example-emails.json")) {
                return mapper.readValue(in, new TypeReference<>() {});
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<UserMail> getMails() {
        return emails;
    }
}
