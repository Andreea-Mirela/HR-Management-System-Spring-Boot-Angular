package com.luv2code.ecommerce.repo;

import com.luv2code.ecommerce.model.EmployeeRoles;
import com.luv2code.ecommerce.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRolesRepo extends JpaRepository<EmployeeRoles, Long> {
    @Query("SELECT er.role FROM EmployeeRoles er WHERE er.employee.id = :userId")
    List<Role> findRolesByUserId(@Param("userId") Long userId);

    @Query("SELECT er.role FROM EmployeeRoles er WHERE er.employee.email = :email")
    List<Role> findRolesByEmail(@Param("email") String email);
}
