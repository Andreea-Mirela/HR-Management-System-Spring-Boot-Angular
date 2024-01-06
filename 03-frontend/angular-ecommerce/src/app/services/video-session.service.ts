import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoSession } from '../common/video-session';

@Injectable({
  providedIn: 'root'
})
export class VideoSessionService {
  private baseUrl = 'http://localhost:8080/videoSessions'; 

  constructor(private httpClient: HttpClient) {}

  getVideoSessions(): Observable<VideoSession[]> {
    return this.httpClient.get<VideoSession[]>(this.baseUrl);
  }

  addVideoSession(videoSession: VideoSession): Observable<VideoSession> {
    return this.httpClient.post<VideoSession>(this.baseUrl, videoSession);
  }

  getLatestVideoSession(): Observable<VideoSession> {
    const url = `${this.baseUrl}/latest`;
    return this.httpClient.get<VideoSession>(url);
  }
}
