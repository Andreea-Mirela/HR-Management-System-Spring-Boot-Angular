package com.luv2code.ecommerce;

import com.luv2code.ecommerce.model.Employee;
import com.luv2code.ecommerce.service.EmployeeService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {
    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        List<Employee> employees = employeeService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployeeWithRoles(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable("email") String email) {
        Employee employee = employeeService.findEmployeeByEmail(email);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

}
