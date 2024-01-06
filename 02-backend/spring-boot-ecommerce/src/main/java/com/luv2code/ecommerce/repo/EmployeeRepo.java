package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee,Long> {
    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);

    Optional<Employee> findEmployeeByEmail(String email);

}
