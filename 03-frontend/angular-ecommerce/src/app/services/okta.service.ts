import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OktaUser } from 'src/app/common/okta-user';

@Injectable({
  providedIn: 'root'
})
export class OktaService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) { }

  addUser(newUser: OktaUser): Observable<any> {
    return this.httpClient.post(this.baseUrl, newUser);
  }
}
