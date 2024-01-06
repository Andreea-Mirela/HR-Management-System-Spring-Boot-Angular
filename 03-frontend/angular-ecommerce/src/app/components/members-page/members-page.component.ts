import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  public totalScore: number = 0;
  isLoading: boolean = true;

  constructor(private scoreService: ScoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.scoreService.getTotalScore(email).subscribe((response) => {
          this.totalScore = response;
        });
      }
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
