import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import alanBtn from "@alan-ai/alan-sdk-web";

@Component({
  selector: 'app-health-training',
  templateUrl: './health-training.component.html',
  styleUrls: ['./health-training.component.css']
})
export class HealthTrainingComponent implements OnInit {

  videoPath: string | undefined;
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;

  alanBtnInstance: any;
  
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    const idTraining = localStorage.getItem('trainingVideoId');
    this.loadVideo(Number(idTraining));

    this.videoService.getSelectedTrainingId().subscribe(id => {
      if (id !== undefined) {
        this.loadVideo(id);
      }
    });
    alanBtn({
      key: '28193696a169d13e3501cbc94b8896612e956eca572e1d8b807a3e2338fdd0dc/stage',
      
    });
  }

  public setVisualState() {
    this.alanBtnInstance.setVisualState({ data: "your data" });
  }

  loadVideo(selectedTrainingId: number): void {
    this.videoService.getTrainingVideoUrl(selectedTrainingId).subscribe(url => {
      this.videoPath = url;
      if (this.videoPlayer) {
        this.videoPlayer.nativeElement.src = this.videoPath;
      }
    });
  }
}
