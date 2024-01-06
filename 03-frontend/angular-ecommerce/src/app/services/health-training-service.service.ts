import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthTrainingServiceService {
  private selectedTrainingId: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getSelectedTrainingId(): Observable<number | undefined> {
    return this.selectedTrainingId.asObservable();
  }

  public setSelectedTrainingId(trainingId: number): void {
    this.selectedTrainingId.next(trainingId);
  }

  public getTrainingDocument(trainingId: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiServerUrl}/training/documents/${trainingId}`, { responseType: 'blob' as 'json' });
  }
  
  public getTrainingDocumentUrl(trainingId: number): Observable<string> {
    return this.http.get<Blob>(`${this.apiServerUrl}/training/documents/${trainingId}`, { responseType: 'blob' as 'json' })
      .pipe(map(blob => URL.createObjectURL(blob)));
  }
}
