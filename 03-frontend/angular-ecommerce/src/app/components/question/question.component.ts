import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService  } from 'src/app/services/question.service';
import { ScoreService } from 'src/app/services/score.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

  public totalScore: number = 0;


  constructor(private questionService: QuestionService, private scoreService: ScoreService, private authService: AuthService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    
    this.authService.getUserEmail().subscribe(email => {
      if (email) {
        this.employeeService.getEmployeeByEmail(email).subscribe(employee => {
          this.name = employee.name;
        });
      }
    });
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
        console.log(this.questionList);
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();

      this.authService.getUserEmail().subscribe((email) => {
        if (email) {
          this.scoreService.saveScore(email, this.points).subscribe((response) => {
            console.log(response);
            this.scoreService.getTotalScore(email).subscribe((response) => {
              this.totalScore = response;
            });
          });
        }
      });
    
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }

  downloadCertificate() {
    // Verificăm dacă quiz-ul este complet
    if (!this.isQuizCompleted) return;
  
    // Creăm o nouă instanță jsPDF în formatul landscape
    const doc = new jsPDF('landscape');
  
    // Presupunem că avem o imagine background.jpg în directorul assets al proiectului
    const imgData = '/assets/images/diploma.png';
  
    // Obținem dimensiunile reale ale imaginii
    const imgProps = doc.getImageProperties(imgData);
    const imgWidth = doc.internal.pageSize.getWidth();
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
    // Adăugăm imaginea de fundal
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Diploma de participare', 148, 40, { align: 'center' });
  
    doc.setFontSize(16);
  doc.text(`Felicitari, ${this.name.replace(/[^a-zA-Z0-9 ]/g, "")}!`, 148, 70, { align: "center" });

  doc.setFontSize(14);
  doc.text(`Ai participat cu succes la sesiunea noastra de formare.`, 148, 90, { align: "center" });
  doc.text(`Rezultatele obtinute si implicarea ta au fost remarcabile.`, 148, 130, { align: "center" });
  doc.text(`Felicitari pentru eforturile depuse si dedicatia demonstrata.`, 148, 150, { align: "center" });

  
    // Salvăm PDF-ul
    doc.save('diploma.pdf');
  }
  
  
  
  
  



  claimReward() {

  }
}
