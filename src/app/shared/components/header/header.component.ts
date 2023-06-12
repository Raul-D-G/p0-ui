import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from './../../services/progress-bar.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs: boolean;
  constructor(
    private progress: NgProgress,
    public progressBar: ProgressBarService,
    public authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }

  logout() {
    this.authService.logout();
    if (localStorage.getItem('token') == null) {
      this.alertService.success('Deconectare!');
    }
  }

  rutaNavBar(): string {
    if (this.authService.isLoggedIn()) {
      return '/companie';
    }
    return '';
  }
}
