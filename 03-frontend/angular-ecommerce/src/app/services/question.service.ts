import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { QuizService } from './quiz.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiServerUrl = 'http://localhost:8080';
  private selectedTrainingId: number | undefined;

  constructor(private http: HttpClient, private quizService: QuizService) { }

  getQuestionJson(): Observable<any> {
    const trainingId = this.getSelectedTrainingId();
  
    console.log("TRAINING ID SELECTAT: " + trainingId);
  
    if (trainingId) {
      const endpoint = `${this.apiServerUrl}/api/quizzes/${trainingId}`;
  
      console.log("ENDPOINT TRAINING ID SELECTAT: " + endpoint);
  
      return this.http.get<any>(endpoint).pipe(
        map((response: any) => JSON.parse(response[0].quizJson)) // Parsează quizJson și returnează rezultatul
      );
    } else {
      return new Observable<any>();
    }
  }
  

  // getQuestionJson(){
  //   return this.http.get<any>("assets/questions.json");
  // }

  setSelectedTrainingId(trainingId: number): void {
    this.selectedTrainingId = trainingId;
  }

  getSelectedTrainingId(): number | undefined {
    return this.selectedTrainingId;
  }
}
