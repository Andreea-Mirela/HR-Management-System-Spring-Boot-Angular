import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private selectedTrainingId: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getSelectedTrainingId(): Observable<number | undefined> {
    return this.selectedTrainingId.asObservable();
  }

  public setSelectedTrainingId(trainingId: number): void {
    this.selectedTrainingId.next(trainingId);
  }

  public getTrainingVideoUrl(trainingId: number): Observable<string> {
    return this.http.get<Blob>(`${this.apiServerUrl}/training/videos/${trainingId}`, { responseType: 'blob' as 'json' })
      .pipe(map(blob => URL.createObjectURL(blob)));
  }
}
