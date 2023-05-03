import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

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
