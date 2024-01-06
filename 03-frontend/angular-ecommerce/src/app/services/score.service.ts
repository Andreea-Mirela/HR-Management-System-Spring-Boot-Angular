import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  saveScore(email: string, score: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/saveScore', { email: email, score: score });
  }

  getTotalScore(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/getTotalScore?email=${email}`);
  }
}