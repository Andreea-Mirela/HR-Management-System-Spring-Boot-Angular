package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.exception.UserNotFoundException;
import com.luv2code.ecommerce.model.Employee;
import com.luv2code.ecommerce.model.EmployeeRoles;
import com.luv2code.ecommerce.model.Role;
import com.luv2code.ecommerce.repo.EmployeeRepo;
import com.luv2code.ecommerce.repo.EmployeeRolesRepo;
import com.luv2code.ecommerce.repo.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    private final RoleRepository roleRepo;

    private final EmployeeRolesRepo employeeRolesRepo;

    public EmployeeService(EmployeeRepo employeeRepo, RoleRepository roleRepo, EmployeeRolesRepo employeeRolesRepo) {
        this.employeeRepo = employeeRepo;
        this.roleRepo = roleRepo;
        this.employeeRolesRepo = employeeRolesRepo;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }


    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteEmployee(Long id) {
        employeeRepo.deleteEmployeeById(id);
    }

    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    public Employee addEmployeeWithRoles(Employee employee) {
        // Salvare angajat
        Employee savedEmployee = employeeRepo.save(employee);

        // Adăugare roluri angajatului
        List<Role> roles = employee.getRoles();
        if (roles != null) {
            addRolesToEmployee(savedEmployee, roles);
        }

        return savedEmployee;
    }


    public void addRolesToEmployee(Employee employee, List<Role> roles) {
        for (Role role : roles) {
            EmployeeRoles employeeRoles = new EmployeeRoles(employee, role);
            employeeRolesRepo.save(employeeRoles);
        }
    }

    public Employee findEmployeeByEmail(String email) {
        return employeeRepo.findEmployeeByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " was not found"));
    }




}
