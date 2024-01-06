package com.luv2code.ecommerce;


import com.luv2code.ecommerce.dto.UserDto;
import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserBuilder;
import com.okta.sdk.resource.user.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    private final Client oktaClient;

    @Autowired
    public UserController(Client oktaClient) {
        this.oktaClient = oktaClient;
    }

    @PostMapping("/api/users")
    public void createUser(@RequestBody UserDto userDto) {
        Map<String, Object> profileMap = new HashMap<>();
        profileMap.put("firstName", userDto.getFirstName());
        profileMap.put("lastName", userDto.getLastName());
        profileMap.put("email", userDto.getEmail());
        profileMap.put("login", userDto.getLogin());

        User user = UserBuilder.instance()
                .setProfileProperties(profileMap)
                .setPassword(userDto.getPassword().toCharArray())
                .buildAndCreate(oktaClient);

    }
}
