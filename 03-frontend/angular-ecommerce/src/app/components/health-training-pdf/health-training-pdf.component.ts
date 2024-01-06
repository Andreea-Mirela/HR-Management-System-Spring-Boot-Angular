import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HealthTrainingServiceService } from 'src/app/services/health-training-service.service';
import jsPDF from 'jspdf';
import alanBtn from "@alan-ai/alan-sdk-web";

@Component({
  selector: 'app-health-training-pdf',
  templateUrl: './health-training-pdf.component.html',
  styleUrls: ['./health-training-pdf.component.css']
})
export class HealthTrainingPdfComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  src: string | undefined;
  userNotes: string = '';

  alanBtnInstance: any;


  constructor(
    private healthTrainingService: HealthTrainingServiceService,
    private http: HttpClient
  ) {
    
   }
   

  ngOnInit(): void {
    const idTraining = localStorage.getItem('trainingId');
    this.loadPdf(Number(idTraining));

    alanBtn({
      key: '28193696a169d13e3501cbc94b8896612e956eca572e1d8b807a3e2338fdd0dc/stage'
    });
    this.alanBtnInstance.setLanguage('ro');
  }

  public setVisualState() {
    this.alanBtnInstance.setVisualState({ data: "your data" }); 
  }
  

  

  loadPdf(selectedTrainingId: number): void {
    this.healthTrainingService.getTrainingDocumentUrl(selectedTrainingId).subscribe(url => {
      this.src = url;
    });
  }

  saveNotes(): void {
    // Salvarea notițelor într-un serviciu sau sistem de stocare
  }

  downloadNotes(content: HTMLTextAreaElement): void {
    const doc = new jsPDF();
    const notes = content.value;
  
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(notes, 10, 10);
  
    const fileName = 'Notite Training.pdf';
    doc.save(fileName);
  }
}
