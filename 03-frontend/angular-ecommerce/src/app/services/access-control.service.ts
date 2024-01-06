import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  constructor(
    private authService: AuthService,
    private roleService: RoleService
  ) {}

  public canAccessComponent(component: string): Observable<boolean> {
    return this.authService.getUserEmail().pipe(
      switchMap(userEmail => {
        if (!userEmail) {
          return of(false);
        }
        return this.roleService.getUserRoles(userEmail).pipe(
          switchMap(roles => of(roles.includes(component))),
          catchError((error) => {
            console.error('Error retrieving roles', error);
            return of(false);
          })
        );
      })
    );
  }
}
