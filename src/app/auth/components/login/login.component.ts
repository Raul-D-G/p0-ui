import { ProgressBarService } from './../../../shared/services/progress-bar.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public progressBar: ProgressBarService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    this.progressBar.startLoading();

    const loginObserver = {
      next: (x) => {
        this.progressBar.setSuccess();
        this.alertService.success('Autentificare reușită!');
        this.progressBar.completeLoading();
        this.router.navigateByUrl('/companie');
      },
      error: (err) => {
        this.progressBar.setError();
        this.alertService.danger(err.error.error);
        this.progressBar.completeLoading();
        loginForm.reset();
      },
    };
    this.authService.login(loginForm.value).subscribe(loginObserver);
  }
}
