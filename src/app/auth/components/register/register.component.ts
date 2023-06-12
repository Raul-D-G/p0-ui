import { ProgressBarService } from './../../../shared/services/progress-bar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(registerform: NgForm) {
    this.progressBar.startLoading();
    const registerObserver = {
      next: (x) => {
        this.progressBar.setSuccess();
        this.alertService.success('Înregistrare reușită!');
        this.progressBar.completeLoading();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.progressBar.setError();
        this.alertService.danger('Înregistrare eșuată!');
        this.progressBar.completeLoading();
        registerform.reset();
      },
    };
    this.authService.register(registerform.value).subscribe(registerObserver);
  }
}
