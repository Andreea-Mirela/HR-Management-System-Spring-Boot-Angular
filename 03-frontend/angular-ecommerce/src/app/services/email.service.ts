import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import { OktaUser } from '../common/okta-user';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailUrl = 'http://localhost:8080/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(employee: OktaUser): Observable<any> {
    return this.http.post(this.emailUrl, employee);
  }
  
  
}
