import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  langauge: string;
  currentUrl: string;
  urlSplit: string[];
  constructor() { 
      this.currentUrl = location.pathname;
    this.urlSplit = this.currentUrl.split('/', 4);
    this.langauge = this.urlSplit[1];
  }

  ngOnInit() {
  }

}
