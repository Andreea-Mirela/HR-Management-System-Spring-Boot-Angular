package com.luv2code.ecommerce.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "employee_roles")
public class EmployeeRoles implements Serializable {
    @EmbeddedId
    private EmployeeRolesId id;

    @MapsId("employeeId")
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @MapsId("roleId")
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public EmployeeRoles() {
    }

    public EmployeeRoles(Employee employee, Role role) {
        this.employee = employee;
        this.role = role;
        this.id = new EmployeeRolesId(employee.getId(), (long) role.getId());
    }

    public EmployeeRolesId getId() {
        return id;
    }

    public void setId(EmployeeRolesId id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}