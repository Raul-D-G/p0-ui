import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companie',
  templateUrl: './companie.component.html',
  styleUrls: ['./companie.component.css'],
})
export class CompanieComponent implements OnInit {
  constructor(public authService: AuthService) {}
  collapsed = true;
  ngOnInit(): void {}
}
