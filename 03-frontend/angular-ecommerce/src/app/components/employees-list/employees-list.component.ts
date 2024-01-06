import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { OktaService } from 'src/app/services/okta.service';
import { EmailService } from 'src/app/services/email.service';
import { OktaUser } from 'src/app/common/okta-user';
import { Role } from 'src/app/common/role';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  public roles: Role[] = [];
  public selectedRoles: number[] = [];

  constructor(private employeeService: EmployeeService, 
              private oktaService: OktaService,
              private emailService: EmailService 
              ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getRoles();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    );
}

public onAddEmloyee(addForm: NgForm): void {
  // @ts-ignore: Object is possibly 'null'.
  document.getElementById('add-employee-form').click();

  const employee: Employee = {
    name: addForm.value.name,
    email: addForm.value.email,
    jobTitle: addForm.value.jobTitle,
    phone: addForm.value.phone,
    imageUrl: addForm.value.imageUrl,
    employeeCode: '', // Puteți lăsa acest câmp gol pentru că va fi generat automat de server
    roles: this.roles.filter(role => this.selectedRoles.includes(role.id)) // Filtrați rolurile selectate pe baza ID-urilor
  };

  this.employeeService.addEmployeeWithRoles(employee).subscribe( // Folosim metoda addEmployeeWithRoles in loc de addEmployee
    (response: Employee) => { // Nu este un array aici, deoarece adăugăm doar un singur angajat
      console.log(response);
      console.log(addForm.value);
      if (addForm.value.createOktaAccount) {
        const newUser = {
          firstName: addForm.value.name.split(' ')[0],
          lastName: addForm.value.name.split(' ')[1] || '',
          email: addForm.value.email,
          login: addForm.value.email,
          password: addForm.value.name.split(' ')[0] + addForm.value.name.split(' ')[1] + addForm.value.email.length + '!'
        }

        //trimit mail 
        console.log(response);
        // Here is where you'd send the email
        this.emailService.sendEmail(newUser).subscribe(
          (response) => {
            //console.log(response);
          },
          (error) => {
            alert(error.message);
          }
        );

        //acum creez userul okta
        console.log(newUser);
        this.oktaService.addUser(newUser).subscribe(
          (response) => {
           console.log(response);
          },
          (error: HttpErrorResponse) => {
            alert(error.message); //rezolva asta cand ai timp
          }
        );
      }
      this.getEmployees();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}




public onUpdateEmloyee(employee: Employee): void {
  this.employeeService.updateEmployee(employee).subscribe(
    (response: Employee[]) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteEmloyee(employeeId: number): void {
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public searchEmployees(key: string): void {
  console.log(key);
  const results: Employee[] = [];
  for (const employee of this.employees) {
    if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(employee);
    }
  }
  this.employees = results;
  if (results.length === 0 || !key) {
    this.getEmployees();
  }
}

public onOpenModal(employee: Employee, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button'; //schimba tipul default Submit in string
  button.style.display = 'none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-bs-target', '#addEmployeeModal');
  }
  if (mode === 'edit') {
    this.editEmployee = employee;
    button.setAttribute('data-bs-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
    this.deleteEmployee = employee;
    button.setAttribute('data-bs-target', '#deleteEmployeeModal');
  }
  container?.appendChild(button);
  button.click();
}
getEmployeeId() {
  if (this.deleteEmployee) {
    return this.deleteEmployee.id;
  } else {
    return -1;
  }
}

public getRoles(): void {
  this.employeeService.getRoles().subscribe(
    (response: Role[]) => {
      this.roles = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onRoleCheckboxChange(event: any, roleId: number): void {
  if (event.target.checked) {
    this.selectedRoles.push(roleId);
  } else {
    const index = this.selectedRoles.indexOf(roleId, 0);
    if (index > -1) {
      this.selectedRoles.splice(index, 1);
    }
  }
}


}
