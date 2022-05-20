import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects = [
    { label: 'Project1', imgSrc: '/assets/img/app.png', date: '21 Mar 2026' },
    { label: 'Project2', imgSrc: 'assets/img/app.png', date: '21 Mar 2022' },
    { label: 'Project3', imgSrc: 'assets/img/app.png', date: '01 Sep 2021'  },
    { label: 'Project4', imgSrc: 'assets/img/app.png', date: '25 Mar 2022'  },
    { label: 'Project5', imgSrc: 'assets/img/app.png', date: '17 Feb 2022'  },
    { label: 'Project6', imgSrc: 'assets/img/app.png', date: '21 Jan 2022'  },
    { label: 'Project7', imgSrc: 'assets/img/app.png', date: '11 Mar 2022'  },
    { label: 'Project8', imgSrc: 'assets/img/app.png', date: '21 Dec 2021'  },
]
  constructor() { }

  ngOnInit(): void {
  }

}
