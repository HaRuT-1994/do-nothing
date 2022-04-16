import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects = [
    { label: 'Project1', imgSrc: '/assets/img/app.png' },
    { label: 'Project2', imgSrc: 'assets/img/app.png' },
    { label: 'Project3', imgSrc: 'assets/img/app.png' },
    { label: 'Project4', imgSrc: 'assets/img/app.png' },
    { label: 'Project5', imgSrc: 'assets/img/app.png' },
    { label: 'Project6', imgSrc: 'assets/img/app.png' },
    { label: 'Project7', imgSrc: 'assets/img/app.png' },
    { label: 'Project8', imgSrc: 'assets/img/app.png' },
]
  constructor() { }

  ngOnInit(): void {
  }

}
