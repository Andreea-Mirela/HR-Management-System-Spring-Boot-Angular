package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.model.Role;
import com.luv2code.ecommerce.repo.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}