import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import { Role } from '../common/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = 'http://localhost:8080';//nu mi a mers partea asta din environment.ts pentru ca nu il gasesc

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
}

public addEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${this.apiServerUrl}/employee/add`, employee);
}

// public addUserToOkta(user: any): Observable<any> {
//   return this.http.post<any>(`${this.apiServerUrl}/api/users`, user);
// }

public updateEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${this.apiServerUrl}/employee/update`, employee);
}

public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
}

public getRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(`${this.apiServerUrl}/role/all`);
}

public addEmployeeWithRoles(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
}

public getEmployeeByEmail(email: string): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/email/${email}`);
}
}