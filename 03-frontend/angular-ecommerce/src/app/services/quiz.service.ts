import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../common/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl = 'http://localhost:8080';
  private selectedTrainingId: number | undefined;

  constructor(private http: HttpClient) { }

  public getQuizzes(trainingId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiServerUrl}/api/quizzes/${trainingId}`);
  }  

  // public addQuiz(trainingId: number, quiz: Quiz): Observable<Quiz> {
  //   return this.http.post<Quiz>(`${this.apiServerUrl}/quizzes/${trainingId}`, quiz);
  // }

  public addQuiz(trainingId: number, quizJson: any): Observable<Quiz> {
    const url = `${this.apiServerUrl}/api/quizzes`;
    const quiz: Quiz = {
      quizId: 0,
      trainingId,
      quizJson: JSON.stringify(quizJson)  // transformă obiectul JavaScript în șir JSON
    };
    console.log("test" +JSON.stringify(quiz));
    return this.http.post<Quiz>(url, quiz);
  }
  
  

  public deleteQuiz(quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/quiz/delete/${quizId}`);
  }

  public getSelectedTrainingId(): number | undefined {
    return this.selectedTrainingId;
  }

  public setSelectedTrainingId(trainingId: number): void {
    this.selectedTrainingId = trainingId;
  }
}
