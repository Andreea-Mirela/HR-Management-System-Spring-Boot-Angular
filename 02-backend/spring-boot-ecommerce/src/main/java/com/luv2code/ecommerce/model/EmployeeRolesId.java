package com.luv2code.ecommerce.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class EmployeeRolesId implements Serializable {
    private Long employeeId;
    private Long roleId;

    public EmployeeRolesId() {
    }

    public EmployeeRolesId(Long employeeId, Long roleId) {
        this.employeeId = employeeId;
        this.roleId = roleId;
    }

    // Getters and setters

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}