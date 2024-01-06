import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { fromEvent, Observable  } from 'rxjs';
import { Training } from 'src/app/common/training';
import { TrainingService } from 'src/app/services/training.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/common/quiz';
import { QuizQuestion } from 'src/app/common/quiz-question';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { HealthTrainingServiceService } from 'src/app/services/health-training-service.service';
import { VideoService } from 'src/app/services/video.service';
import { AccessControlService } from 'src/app/services/access-control.service';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  public trainings: Training[] = [];
  public editTraining!: Training;
  public deleteTraining!: Training;
  public training: Training = {} as Training;
  public logoFile!: File;
  public documentFile!: File;
  public videoFile!: File;

  public quizzes: Quiz[] = [];
  public deleteQuiz: Quiz | null = null;
  public selectedTrainingId: number | undefined;
  public options: { text: string, correct: boolean }[] = [
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ];

  public quizQuestions: QuizQuestion[] = [];
  
  public optionsCorrect: boolean[] = [false, false, false, false];
  
  public apiServerUrl = 'http://localhost:8080';

  expandedStates: boolean[] = [];
  expandedDescriptions: { [key: number]: boolean } = {};
  fullDescriptions: string[] = [];

  canAccessHRFunctions$: Observable<boolean>;
  canAccessEmployeeFunctions$: Observable<boolean>;


  constructor(private trainingService: TrainingService, 
              private quizService: QuizService,
              private questionService: QuestionService,
              private healthTrainingServiceService: HealthTrainingServiceService,
              private videoService: VideoService,
              private router: Router,
              private accessControlService: AccessControlService) {

                this.canAccessHRFunctions$ = this.accessControlService.canAccessComponent('Specialist HR');
                this.canAccessEmployeeFunctions$ = this.accessControlService.canAccessComponent('Angajat');
               }

  ngOnInit(): void {
    this.getTrainings();
    const modalElement = document.getElementById('updateTrainingModal');
    if (modalElement) {
    fromEvent(modalElement, 'shown.bs.modal').pipe(
    ).subscribe(() => {
      // Resetează inputul de tip file
      this.resetForm();
    });
  }
  }

  public getTrainings(): void {
    this.trainingService.getTrainings().subscribe(
      (response: Training[]) => {
        this.trainings = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTraining(addForm: NgForm): void {
    document.getElementById('add-training-form')?.click();
  
    const training: Training = {
      id: 0,
      title: addForm.value.title,
      type: addForm.value.type,
      time: addForm.value.time,
      description: addForm.value.description,
      logo: addForm.value.logo,
      document: addForm.value.document,
      video: addForm.value.video
    };
  
    const formData = new FormData();
    formData.append('title', training.title);
    formData.append('type', training.type);
    formData.append('time', training.time);
    formData.append('description', training.description);
    formData.append('logo', this.logoFile);
    formData.append('document', this.documentFile);
    formData.append('video', this.videoFile);
  
    this.trainingService.addTraining(formData).subscribe(
      (response: Training) => {
        console.log(response);
        this.getTrainings();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
  
  
  public onLogoFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.logoFile = inputElement.files[0];
    }
  }
  
  public onDocumentFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.documentFile = inputElement.files[0];
    }
  }
  
  public onVideoFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files) {
      this.videoFile = inputElement.files[0];
    }
  }
  

  // public onUpdateTraining2(training: Training): void {
  //   this.trainingService.updateTraining(training).subscribe(
  //     (response: Training) => {
  //       console.log(response);
  //       this.getTrainings();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public onUpdateTraining(training: Training): void {
    const formData = new FormData();
    formData.append('id', training.id.toString());
    formData.append('title', training.title);
    formData.append('type', training.type);
    formData.append('time', training.time);
    formData.append('description', training.description);
  
    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }
  
    if (this.documentFile) {
      formData.append('document', this.documentFile);
    }
  
    if (this.videoFile) {
      formData.append('video', this.videoFile);
    }
  
    this.trainingService.updateTraining(formData).subscribe(
      (response: Training) => {
        console.log(response);
        this.getTrainings();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onDeleteTraining(trainingId: number): void {
    this.trainingService.deleteTraining(trainingId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTrainings();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTrainings(key: string): void {
    console.log(key);
    const results: Training[] = [];
    for (const training of this.trainings) {
      if (training.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || training.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(training);
      }
    }
    this.trainings = results;
    if (results.length === 0 || !key) {
      this.getTrainings();
    }
  }

  public onOpenModal(training: Training, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addTrainingModal');
      this.resetForm();
    }
    if (mode === 'edit') {
      this.editTraining = training;
      button.setAttribute('data-bs-target', '#updateTrainingModal');
      this.resetForm();
    }
    if (mode === 'delete') {
      this.deleteTraining = training;
      button.setAttribute('data-bs-target', '#deleteTrainingModal');
    }
    container?.appendChild(button);
    button.click();
  }

  
  
  public getLogoUrl(training: Training): string {
    if (training.logo) {
      const imageUrl = 'data:image/jpeg;base64,' + training.logo;
      //console.log('Logo URL:', imageUrl);
      return imageUrl;
    }
    return '';
  }
  
  
  public getDocumentUrl(training: Training): string {
    if (training.document) {
      return `http://localhost:8080/${training.document}`;
    }
    return '';
  }
  
  public getVideoUrl(training: Training): string {
    if (training.video) {
      return `http://localhost:8080/${training.video}`;
    }
    return '';
  }
  
  public resetForm(): void {
    const inputElement = document.getElementById('logo') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }
  

  getTrainingId() {
    if (this.deleteTraining) {
      return this.deleteTraining.id;
    } else {
      return -1;
    }
  }

  public getQuizzes(trainingId: number): void {
    if (trainingId === undefined) {
      alert('Please select a training.'); // Sau poți afișa o eroare în alt mod
      return;
    }

    this.quizService.setSelectedTrainingId(trainingId);

  
    this.quizService.getQuizzes(trainingId).subscribe(
      (response: Quiz[]) => {
        this.quizzes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onAddQuiz(quizForm: NgForm): void {
    document.getElementById('add-quiz-form')?.click();
  
    const quizJson = {
      questions: this.quizQuestions
    };
  
    this.quizService.addQuiz(this.selectedTrainingId!, quizJson).subscribe(
      (response: Quiz) => {
        console.log(response);
        this.getQuizzes(this.selectedTrainingId!);
        this.quizQuestions = []; // Goliți lista de întrebări după ce le-ați trimis la server
        quizForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.quizQuestions = []; // Goliți lista de întrebări dacă există o eroare
        quizForm.reset();
      }
    );
  }
  
  
  

  public onDeleteQuiz(quizId: number): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      (response: void) => {
        console.log(response);
        this.getQuizzes(this.training.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenQuizModal(trainingId: number, mode: string): void {
    this.quizService.setSelectedTrainingId(trainingId);

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addQuizModal');
    }
    this.selectedTrainingId = trainingId; // Setează selectedTrainingId cu ID-ul trainingului
    //this.options = ['', '', '', '']; // Inițializează options cu un array de 4 elemente goale
    container?.appendChild(button);
    button.click();
  }
  
  
  
  
      getQuizId() {
        if (this.deleteQuiz) {
          return this.deleteQuiz.quizId;
        } else {
          return -1;
        }
      }
      
      public onAddQuestion(quizForm: NgForm): void {
        const question: QuizQuestion = {
          questionText: quizForm.value.questionText,
          options: this.options.filter((option) => option.text !== ''),
          explanation: quizForm.value.explanation
        };
        
        this.quizQuestions.push(question);
        quizForm.reset();
      }
      
      public addQuestion(): void {
        const newQuestion: QuizQuestion = {
          questionText: '',
          options: [
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
          ],
          explanation: ''
        };
      
        this.quizQuestions.push(newQuestion);
      }
      
      onOpenQuiz(trainingId: number) {
        this.questionService.setSelectedTrainingId(trainingId);
        this.router.navigate(['/quiz']);
      }

      public onViewTraining(trainingId: number): void {
        this.healthTrainingServiceService.setSelectedTrainingId(trainingId);
        localStorage.setItem('trainingId', trainingId.toString());
        //this.router.navigate(['/healthTrainingPdf']);
        //window.open('/healthTrainingPdf', '_blank');
        const newTab = window.open('/healthTrainingPdf', '_blank');
        newTab!.focus();
        
        console.log("CLICK PDF ID TRAINING = " + trainingId)
    }

    public onViewVideo(trainingId: number): void {
      this.videoService.setSelectedTrainingId(trainingId);
      localStorage.setItem('trainingVideoId', trainingId.toString());
      //this.router.navigate(['/healthTrainingPdf']);
      //window.open('/healthTrainingPdf', '_blank');
      const newTab = window.open('/healthTraining', '_blank');
      newTab!.focus();
      
      console.log("CLICK PDF ID TRAINING = " + trainingId)
  }
 

toggleDescription(index: number) {
  this.expandedDescriptions[index] = !this.expandedDescriptions[index];
}

isDescriptionExpanded(index: number): boolean {
  return this.expandedDescriptions[index] || false;
}
}
