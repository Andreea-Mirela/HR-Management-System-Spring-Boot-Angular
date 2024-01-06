package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.model.Role;
import com.luv2code.ecommerce.repo.EmployeeRolesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class EmployeeRolesController {
    @Autowired
    private EmployeeRolesRepo employeeRoleRepository;

    @GetMapping("/{userId}")
    public List<Role> getRolesById(@PathVariable Long userId) {
        return employeeRoleRepository.findRolesByUserId(userId);
    }

    @GetMapping("/mail/{userEmail}")
    public List<Role> getRolesByEmail(@PathVariable String userEmail) {
        return employeeRoleRepository.findRolesByEmail(userEmail);
    }
}
