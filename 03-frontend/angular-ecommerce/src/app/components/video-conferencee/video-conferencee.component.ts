import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VideoSession } from 'src/app/common/video-session';
import { VideoSessionService } from 'src/app/services/video-session.service';

declare const JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-video-conferencee',
  templateUrl: './video-conferencee.component.html',
  styleUrls: ['./video-conferencee.component.css']
})
export class VideoConferenceeComponent implements OnInit {

  isJitsiOpen: boolean = false;
  jitsiApi: any;
  password: string = '';
  inviteeEmail1: string = '';
  sessionDateTime: string = '';

  latestSessionPassword: string = '';

  constructor(private videoSessionService: VideoSessionService) { }

  ngOnInit() {
    this.videoSessionService.getLatestVideoSession().subscribe(
      (latestSession) => {
        this.latestSessionPassword = latestSession.password;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openJitsiContainer() {
    this.videoSessionService.getLatestVideoSession().subscribe(
      (latestSession) => {
        const enteredPassword = prompt('Introduceți parola:');
  
        if (enteredPassword !== latestSession.password) {
          alert('Parolă incorectă!');
          return;
        }
  
        const jitsiContainer = document.getElementById('jitsi-container');
        jitsiContainer!.classList.add('large');
        jitsiContainer!.style.display = 'block';
  
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'Video-conferință',
          width: '100%',
          height: '100%',
          parentNode: jitsiContainer,
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
          },
        };
  
        this.jitsiApi = new JitsiMeetExternalAPI(domain, options);
        this.isJitsiOpen = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  closeJitsiContainer() {
    const jitsiContainer = document.getElementById('jitsi-container');
    jitsiContainer!.style.display = 'none';

    if (this.jitsiApi) {
      this.jitsiApi.dispose();
    }
    this.isJitsiOpen = false;
  }

  onSubmit(form: NgForm) {
    const sessionDateTime = this.sessionDateTime;
    const password = this.password;
    const inviteeEmail1 = this.inviteeEmail1;
    
    const videoSession = new VideoSession(sessionDateTime, password, inviteeEmail1);
    
    this.videoSessionService.addVideoSession(videoSession).subscribe(
      (response) => {
        document.getElementById('scheduleVideoSessionModal')?.click();
        form.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showLatestSession() {
    this.videoSessionService.getLatestVideoSession().subscribe(
      (session: VideoSession) => {
        if (session) {
          const sessionDateTime = new Date(session.sessionDateTime);
          const formattedDate = sessionDateTime.toLocaleString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          });
          const amPm = sessionDateTime.getHours() >= 12 ? 'PM' : 'AM';
          const message = `Următoarea sesiune video este programată pentru ${formattedDate} .`;
          alert(message);
        } else {
          alert('Nu există sesiuni video programate în viitor.');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
