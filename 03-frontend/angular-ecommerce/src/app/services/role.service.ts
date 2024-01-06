import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleUrl = 'http://localhost:8080/roles/';

  constructor(private http: HttpClient) { }

  getRoles(userId: string): Observable<string[]> {
    return this.http.get<string[]>(this.roleUrl + userId);
  }

  getUserRoles(email: string): Observable<string[]> {
    return this.http.get<any[]>(this.roleUrl + "mail/"+ email).pipe(
      map(roles => roles.map(role => role.name))
    );
  }
}
