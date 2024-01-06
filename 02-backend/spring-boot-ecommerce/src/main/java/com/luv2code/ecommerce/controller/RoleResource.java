package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.model.Role;
import com.luv2code.ecommerce.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleResource {
    private final RoleService roleService;

    public RoleResource(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.findAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}